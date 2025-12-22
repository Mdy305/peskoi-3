import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SystemStatus() {
  const queryClient = useQueryClient();

  const { data: verificationResults, isLoading, refetch } = useQuery({
    queryKey: ["squareVerification"],
    queryFn: async () => {
      const response = await base44.functions.invoke("verifySquareSandbox", {});
      return response.data;
    },
    retry: false
  });

  const handleRetest = () => {
    refetch();
  };

  const getStatusColor = (status) => {
    if (status === 'PASSED') return 'text-white';
    if (status === 'WARNING') return 'text-white/60';
    if (status === 'FAILED') return 'text-white/40';
    if (status === 'PENDING') return 'text-white/30';
    if (status === 'SKIPPED') return 'text-white/20';
    return 'text-white/40';
  };

  const getStatusText = (status) => {
    if (status === 'PASSED') return '✓';
    if (status === 'WARNING') return '⚠';
    if (status === 'FAILED') return '✗';
    if (status === 'PENDING') return '○';
    if (status === 'SKIPPED') return '—';
    return '?';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/60 text-sm tracking-wide">Verifying system...</p>
        </div>
      </div>
    );
  }

  const results = verificationResults || {};
  const overallStatus = results.overall_status || 'UNKNOWN';

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-white/20 text-xs tracking-widest mb-2">PESKOI™</p>
          <p className={`text-xs tracking-wide mb-8 ${
            overallStatus === 'CONNECTED (SANDBOX)' ? 'text-white/60' : 'text-white/40'
          }`}>
            {overallStatus}
          </p>
          <Button
            onClick={handleRetest}
            variant="outline"
            className="border-white/20 text-white/60 hover:bg-white/5 text-xs tracking-wide"
          >
            Re-test Connection
          </Button>
        </div>

        {/* Verification Steps */}
        <div className="space-y-12">
          
          {/* Step 1: Environment Variables */}
          <div className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={getStatusColor(results.step1_env_vars?.status)}>
                {getStatusText(results.step1_env_vars?.status)}
              </span>
              <p className="text-white/80 text-sm tracking-wide">Environment Variables</p>
            </div>
            {results.step1_env_vars?.details && (
              <div className="ml-6 text-white/40 text-xs space-y-1">
                <p>SQUARE_ENV: {results.step1_env_vars.details.SQUARE_ENV}</p>
                <p>SQUARE_ACCESS_TOKEN: {results.step1_env_vars.details.SQUARE_ACCESS_TOKEN}</p>
                <p>SQUARE_LOCATION_ID: {results.step1_env_vars.details.SQUARE_LOCATION_ID}</p>
                <p>Sandbox Mode: {results.step1_env_vars.details.is_sandbox ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>

          {/* Step 2: Location API */}
          <div className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={getStatusColor(results.step2_location_api?.status)}>
                {getStatusText(results.step2_location_api?.status)}
              </span>
              <p className="text-white/80 text-sm tracking-wide">Square Locations API</p>
            </div>
            {results.step2_location_api?.details && (
              <div className="ml-6 text-white/40 text-xs space-y-1">
                {results.step2_location_api.details.total_locations !== undefined && (
                  <p>Locations Found: {results.step2_location_api.details.total_locations}</p>
                )}
                {results.step2_location_api.details.location_name && (
                  <p>Location: {results.step2_location_api.details.location_name}</p>
                )}
                {results.step2_location_api.details.location_id_match !== undefined && (
                  <p>ID Match: {results.step2_location_api.details.location_id_match ? 'Yes' : 'No'}</p>
                )}
                {results.step2_location_api.details.error && (
                  <p className="text-white/60">Error: {results.step2_location_api.details.error}</p>
                )}
                {results.step2_location_api.details.warning && (
                  <p className="text-white/60">Warning: {results.step2_location_api.details.warning}</p>
                )}
              </div>
            )}
          </div>

          {/* Step 3: Appointments API */}
          <div className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={getStatusColor(results.step3_appointments_api?.status)}>
                {getStatusText(results.step3_appointments_api?.status)}
              </span>
              <p className="text-white/80 text-sm tracking-wide">Appointments API</p>
            </div>
            {results.step3_appointments_api?.details && (
              <div className="ml-6 text-white/40 text-xs space-y-1">
                <p>Services: {results.step3_appointments_api.details.services_count}</p>
                <p>Team Members: {results.step3_appointments_api.details.team_members_count}</p>
                <p>Availability Slots: {results.step3_appointments_api.details.availability_slots}</p>
                {results.step3_appointments_api.details.error && (
                  <p className="text-white/60">Error: {results.step3_appointments_api.details.error}</p>
                )}
                {results.step3_appointments_api.details.warning && (
                  <p className="text-white/60">Warning: {results.step3_appointments_api.details.warning}</p>
                )}
              </div>
            )}
          </div>

          {/* Step 4: Test Booking */}
          <div className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={getStatusColor(results.step4_test_booking?.status)}>
                {getStatusText(results.step4_test_booking?.status)}
              </span>
              <p className="text-white/80 text-sm tracking-wide">Test Booking</p>
            </div>
            {results.step4_test_booking?.details && (
              <div className="ml-6 text-white/40 text-xs space-y-1">
                {results.step4_test_booking.details.booking_id && (
                  <p>Booking ID: {results.step4_test_booking.details.booking_id}</p>
                )}
                {results.step4_test_booking.details.message && (
                  <p>{results.step4_test_booking.details.message}</p>
                )}
                {results.step4_test_booking.details.note && (
                  <p className="text-white/30 mt-2">{results.step4_test_booking.details.note}</p>
                )}
                {results.step4_test_booking.details.error && (
                  <p className="text-white/60">Error: {results.step4_test_booking.details.error}</p>
                )}
                {results.step4_test_booking.details.reason && (
                  <p>Skipped: {results.step4_test_booking.details.reason}</p>
                )}
              </div>
            )}
          </div>

          {/* Step 5: Webhook */}
          <div className="border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={getStatusColor(results.step5_webhook?.status)}>
                {getStatusText(results.step5_webhook?.status)}
              </span>
              <p className="text-white/80 text-sm tracking-wide">Webhook Configuration</p>
            </div>
            {results.step5_webhook?.details && (
              <div className="ml-6 text-white/40 text-xs space-y-1">
                <p>{results.step5_webhook.details.message}</p>
                {results.step5_webhook.details.instructions && (
                  <p className="text-white/30 mt-2">{results.step5_webhook.details.instructions}</p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 left-0 right-0"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-white/10 text-xs tracking-widest text-center">
              {overallStatus === 'CONNECTED (SANDBOX)' ? 'SYSTEM READY' : 'SYSTEM NOT READY'}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}