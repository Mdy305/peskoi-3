import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "299",
      description: "For small salons getting started",
      features: [
        "AI voice & SMS concierge",
        "Square integration",
        "Basic analytics",
        "Up to 100 bookings/month",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "599",
      description: "For growing salons",
      featured: true,
      features: [
        "Everything in Starter",
        "Unlimited bookings",
        "Advanced analytics",
        "Retention campaigns",
        "Product recommendations",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "999",
      description: "For multi-location businesses",
      features: [
        "Everything in Professional",
        "Multiple locations",
        "White-label options",
        "Custom integrations",
        "Dedicated account manager",
        "Custom training"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]"
          >
            <Sparkles className="w-4 h-4 text-white/60" />
            <span className="text-sm tracking-wide text-white/60">Simple, transparent pricing</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Choose your plan
          </h1>
          <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`border rounded-lg p-6 sm:p-8 transition-all ${
                plan.featured
                  ? 'border-white/20 bg-white/[0.02]'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              {plan.featured && (
                <div className="inline-block mb-4 px-3 py-1 text-xs tracking-wide bg-white text-black">
                  RECOMMENDED
                </div>
              )}
              
              <h3 className="text-xl sm:text-2xl font-light mb-2">{plan.name}</h3>
              <p className="text-sm text-white/40 mb-6">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-light">${plan.price}</span>
                <span className="text-white/40">/month</span>
              </div>

              <button
                className={`w-full py-3 mb-8 transition-all text-sm tracking-wide ${
                  plan.featured
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/[0.08] hover:border-white/20'
                }`}
              >
                Start free trial
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center border-t border-white/[0.08] pt-12">
          <p className="text-sm text-white/40 mb-4">
            Need a custom solution? Contact us for enterprise pricing.
          </p>
          <button className="text-sm text-white/60 hover:text-white transition-colors tracking-wide">
            Talk to sales
          </button>
        </div>

      </div>
    </div>
  );
}