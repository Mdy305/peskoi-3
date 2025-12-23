import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";

export default function ConnectSquare() {
  const [connecting, setConnecting] = useState(false);

  const connectMutation = useMutation({
    mutationFn: async () => {
      const response = await base44.functions.invoke("squareOAuthInit", {});
      return response.data;
    },
    onSuccess: (data) => {
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    },
  });

  const handleConnect = () => {
    setConnecting(true);
    connectMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-12 max-w-md">
        <div>
          <h1 className="text-3xl font-light tracking-[0.3em] text-white mb-4">
            PESKOI
          </h1>
          <p className="text-white/40 text-sm tracking-wide">
            Connect Square to begin
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full py-4 px-8 bg-white text-black text-sm tracking-wide
                     hover:bg-white/90 transition-colors duration-300
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {connecting ? "Redirecting to Square..." : "Connect Square"}
        </button>
      </div>
    </div>
  );
}
