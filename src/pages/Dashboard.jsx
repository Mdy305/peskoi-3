import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const [realEvents, setRealEvents] = useState([]);

  // Single source of truth: backend session status
  const { data: session, isLoading } = useQuery({
    queryKey: ["sessionStatus"],
    queryFn: () => base44.functions.invoke("sessionStatus", {}),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity
  });

  const step = session?.data?.step;

  // Fetch appointments (only if READY)
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => base44.entities.Appointment.list("-created_date"),
    enabled: step === "READY",
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity
  });

  // Fetch reputation events (only if READY)
  const { data: reputationEvents = [], isLoading: reputationLoading } = useQuery({
    queryKey: ["reputationEvents"],
    queryFn: () => base44.entities.ReputationEvent.list("-created_date"),
    enabled: step === "READY",
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity
  });

  // Redirect if not ready
  useEffect(() => {
    if (!isLoading && step === "CONNECT_SQUARE") {
      window.location.href = createPageUrl('ConnectSquare');
    }
  }, [step, isLoading]);

  useEffect(() => {
    if (step !== "READY") {
      setRealEvents([]);
      return;
    }

    // Combine appointments and reputation events
    const appointmentEvents = appointments.map(apt => ({
      id: apt.id,
      type: 'appointment',
      text: getEventText(apt),
      timestamp: new Date(apt.created_date),
      isGuest: apt.client_name === 'GUEST_INTERACTION',
      data: apt
    }));

    const reputationEventsList = reputationEvents.map(event => ({
      id: event.id,
      type: 'reputation',
      text: getReputationText(event),
      timestamp: new Date(event.created_date),
      isGuest: false,
      requiresAttention: event.requires_attention,
      data: event
    }));

    const allEvents = [...appointmentEvents, ...reputationEventsList]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);

    setRealEvents(prev => {
      if (JSON.stringify(prev) === JSON.stringify(allEvents)) {
        return prev;
      }
      return allEvents;
    });
  }, [appointments, reputationEvents, step]);

  const getEventText = (apt) => {
    // Guest interactions
    if (apt.client_name === 'GUEST_INTERACTION') {
      return apt.notes || 'Guest reached out';
    }

    // System sync events
    if (apt.client_name === 'SYSTEM') {
      return apt.notes || 'System event';
    }

    // Regular appointments
    if (apt.status === 'cancelled') {
      return 'Appointment cancelled';
    }
    if (apt.status === 'completed') {
      return 'Service completed';
    }
    return 'Appointment secured';
  };

  const getReputationText = (event) => {
    if (event.sentiment === 'negative') {
      return `Negative review detected — ${event.rating}★`;
    }
    if (event.sentiment === 'positive' && event.rating >= 4) {
      return `Positive review received — ${event.rating}★`;
    }
    return `Review received — ${event.rating}★`;
  };

  // Black screen while loading or redirecting
  if (isLoading || !step) {
    return <div className="min-h-screen bg-black" />;
  }

  // Black screen while redirect happens
  if (step !== "READY") {
    return <div className="min-h-screen bg-black" />;
  }

  // Black screen while data loads
  if (appointmentsLoading || reputationLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-20">

        {/* Real Events Only */}
        <div className="space-y-12">
          {realEvents.length === 0 ? null : (
            realEvents.map((event) => (
              <div
                key={event.id}
                className="border-b border-white/[0.05] pb-8"
              >
                <p className={`text-sm tracking-wide ${
                  event.requiresAttention ? 'text-white' : 'text-white/80'
                }`}>
                  {event.text}
                </p>
                {event.requiresAttention && (
                  <p className="text-xs text-white/40 mt-2">
                    Requires attention
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>


    </div>
  );
}