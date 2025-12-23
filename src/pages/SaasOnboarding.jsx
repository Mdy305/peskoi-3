import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function SaasOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: "",
    owner_email: "",
    owner_name: "",
    website_url: "",
    subscription_tier: "trial",
  });
  const [onboardingResult, setOnboardingResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const onboardMutation = useMutation({
    mutationFn: (data) => base44.functions.invoke("saasClientOnboard", data),
    onSuccess: (res) => {
      setOnboardingResult(res.data);
      setStep(2);
    },
  });

  const squareConnectMutation = useMutation({
    mutationFn: (client_id) =>
      base44.functions.invoke("saasSquareConnect", { client_id }),
    onSuccess: (res) => {
      window.location.href = res.data.auth_url;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardMutation.mutate(formData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(onboardingResult.embed_script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <p className="text-xs text-white/40 tracking-[0.15em] uppercase mb-12">
          Client Onboarding
        </p>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs text-white/40 block">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) =>
                    setFormData({ ...formData, business_name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/[0.08] pb-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/40 block">
                  Owner Email
                </label>
                <input
                  type="email"
                  value={formData.owner_email}
                  onChange={(e) =>
                    setFormData({ ...formData, owner_email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/[0.08] pb-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/40 block">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={formData.owner_name}
                  onChange={(e) =>
                    setFormData({ ...formData, owner_name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/[0.08] pb-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/40 block">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) =>
                    setFormData({ ...formData, website_url: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/[0.08] pb-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/40 block">
                  Subscription
                </label>
                <select
                  value={formData.subscription_tier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subscription_tier: e.target.value,
                    })
                  }
                  className="w-full bg-black border-b border-white/[0.08] pb-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
                >
                  <option value="trial">Trial (14 days)</option>
                  <option value="starter">Starter ($99/mo)</option>
                  <option value="professional">Pro ($199/mo)</option>
                  <option value="enterprise">Enterprise ($499/mo)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={onboardMutation.isPending}
                className="w-full border border-white/[0.08] px-6 py-3 hover:border-white/20 transition-colors text-sm tracking-wide disabled:opacity-50"
              >
                {onboardMutation.isPending
                  ? "Creating..."
                  : "Create Client Account"}
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && onboardingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm">Client created successfully.</p>
              <div className="bg-white/[0.03] p-3 sm:p-4 border border-white/[0.08] text-xs break-all">
                <span className="text-white/40">ID: </span>
                {onboardingResult.widget_client_id}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-white/30 tracking-[0.15em] uppercase">
                Step 1: Connect Square
              </p>
              <button
                onClick={() =>
                  squareConnectMutation.mutate(onboardingResult.client_id)
                }
                disabled={squareConnectMutation.isPending}
                className="w-full border border-white/[0.08] px-4 sm:px-6 py-3 hover:border-white/20 transition-colors text-sm tracking-wide disabled:opacity-50"
              >
                {squareConnectMutation.isPending
                  ? "Connecting..."
                  : "Connect Square"}
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-white/30 tracking-[0.15em] uppercase">
                Step 2: Embed Widget
              </p>
              <p className="text-xs text-white/40">
                Paste before closing &lt;/body&gt; tag:
              </p>
              <div className="relative">
                <pre className="bg-white/[0.03] p-3 sm:p-4 border border-white/[0.08] text-[10px] sm:text-xs overflow-x-auto max-h-48">
                  {onboardingResult.embed_script}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 hover:bg-white/10 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
