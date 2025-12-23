import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function SquareSetup() {
  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["squareConnection"],
    queryFn: () => base44.functions.invoke("squareCheckConnection", {}),
    retry: false,
  });

  const { data: services } = useQuery({
    queryKey: ["squareServices"],
    queryFn: () => base44.functions.invoke("squareGetServices", {}),
    enabled: connectionStatus?.data?.connected === true,
    retry: false,
  });

  const { data: teamMembers } = useQuery({
    queryKey: ["squareTeamMembers"],
    queryFn: () => base44.functions.invoke("squareGetTeamMembers", {}),
    enabled: connectionStatus?.data?.connected === true,
    retry: false,
  });

  const isConnected = connectionStatus?.data?.connected;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-white/20 text-xs tracking-widest mb-2">SQUARE</p>
          <p className="text-white/60 text-xs tracking-wide">
            {isLoading
              ? "Checking..."
              : isConnected
                ? "Connected"
                : "Not connected"}
          </p>
        </div>

        {/* Connection Details */}
        {isConnected ? (
          <div className="space-y-16">
            {/* Location */}
            {connectionStatus?.data?.location && (
              <div className="border-b border-white/5 pb-8">
                <p className="text-white/40 text-xs tracking-wide mb-3">
                  LOCATION
                </p>
                <p className="text-white text-sm tracking-wide">
                  {connectionStatus.data.location.name}
                </p>
                {connectionStatus.data.location.address?.address_line_1 && (
                  <p className="text-white/40 text-xs mt-2">
                    {connectionStatus.data.location.address.address_line_1}
                  </p>
                )}
              </div>
            )}

            {/* Services */}
            {services?.data?.services && services.data.services.length > 0 && (
              <div className="border-b border-white/5 pb-8">
                <p className="text-white/40 text-xs tracking-wide mb-6">
                  SERVICES
                </p>
                <div className="space-y-6">
                  {services.data.services.map((service) => (
                    <div key={service.id}>
                      <p className="text-white text-sm tracking-wide mb-2">
                        {service.name}
                      </p>
                      {service.variations?.map((variation) => (
                        <div
                          key={variation.id}
                          className="text-white/40 text-xs ml-4 mt-1"
                        >
                          {variation.name} · ${variation.price} ·{" "}
                          {variation.duration_minutes} min
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {teamMembers?.data?.team_members &&
              teamMembers.data.team_members.length > 0 && (
                <div className="border-b border-white/5 pb-8">
                  <p className="text-white/40 text-xs tracking-wide mb-6">
                    TEAM
                  </p>
                  <div className="space-y-3">
                    {teamMembers.data.team_members.map((member) => (
                      <div key={member.id}>
                        <p className="text-white text-sm tracking-wide">
                          {member.name}
                        </p>
                        {(member.email || member.phone) && (
                          <p className="text-white/40 text-xs mt-1">
                            {member.email || member.phone}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm tracking-wide mb-8">
              Square credentials not configured
            </p>
            <div className="text-white/30 text-xs space-y-2">
              <p>Required environment variables:</p>
              <p>SQUARE_ACCESS_TOKEN</p>
              <p>SQUARE_LOCATION_ID</p>
              <p>SQUARE_WEBHOOK_SIGNATURE_KEY</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
