
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

const navigationSections = [
  {
    title: "Overview",
    items: [
      { title: "Activity", url: createPageUrl("Dashboard") },
      { title: "Analytics", url: createPageUrl("Analytics") },
      { title: "Stylists", url: createPageUrl("StylistPerformance") },
    ]
  },
  {
    title: "Operations",
    items: [
      { title: "Book", url: createPageUrl("Book") },
      { title: "AI Assistant", url: createPageUrl("AIAssistant") },
      { title: "Appointments", url: createPageUrl("Appointments") },
      { title: "Calendar", url: createPageUrl("Calendar") },
      { title: "Clients", url: createPageUrl("Clients") },
      { title: "Call Center", url: createPageUrl("CallCenter") },
    ]
  },
  {
    title: "Intelligence",
    items: [
      { title: "Business", url: createPageUrl("BusinessIntelligence") },
      { title: "Services", url: createPageUrl("ServiceIntelligence") },
      { title: "Products", url: createPageUrl("Products") },
      { title: "Campaigns", url: createPageUrl("Campaigns") },
      { title: "Retention", url: createPageUrl("RetentionEngine") },
      { title: "Outreach", url: createPageUrl("ProactiveOutreach") },
    ]
  },
  {
    title: "Reputation",
    items: [
      { title: "Reviews", url: createPageUrl("ReputationManager") },
      { title: "Feedback", url: createPageUrl("FeedbackManager") },
      { title: "Voice & Geo", url: createPageUrl("VoiceGeoRank") },
      { title: "SEO", url: createPageUrl("SEOIntelligence") },
    ]
  },
  {
    title: "SaaS",
    items: [
      { title: "Clients", url: createPageUrl("SaasDashboard") },
      { title: "Analytics", url: createPageUrl("SaasAnalytics") },
      { title: "Onboard New", url: createPageUrl("SaasOnboarding") },
      { title: "Automations", url: createPageUrl("SaasClientAutomations") },
      { title: "Widget Demo", url: createPageUrl("ConciergeWidget") },
    ]
  },
  {
    title: "Config",
    items: [
      { title: "Settings", url: createPageUrl("Settings") },
      { title: "Channels", url: createPageUrl("Channels") },
      { title: "Knowledge", url: createPageUrl("KnowledgeBase") },
      { title: "Records", url: createPageUrl("ServiceRecords") },
    ]
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <button
            onClick={toggleMenu}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="relative z-[70] text-white/60 hover:text-white active:text-white transition-colors text-xs sm:text-sm tracking-wide min-w-[56px] min-h-[56px] flex items-center justify-center -ml-2 touch-manipulation select-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>

          <Link to={createPageUrl("Dashboard")} className="text-base sm:text-xl font-light tracking-[0.2em] text-white hover:text-white/80 transition-colors">
            PESKOI
          </Link>

          <div className="w-11 sm:w-16" />
        </div>
      </header>

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 animate-fade" onClick={toggleMenu}>
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <nav 
            className="absolute top-0 left-0 bottom-0 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] bg-black border-r border-white/[0.08] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-16 sm:pt-20 pb-20 px-6 sm:px-8 lg:px-10">
              {navigationSections.map((section, idx) => (
                <div key={section.title} className={idx > 0 ? "mt-8 sm:mt-10" : ""}>
                  <div className="text-[10px] sm:text-xs text-white/30 tracking-[0.15em] uppercase mb-3 sm:mb-4">
                    {section.title}
                  </div>
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={toggleMenu}
                      className={`block py-3 sm:py-3.5 text-base sm:text-lg tracking-wide transition-all duration-200 min-h-[48px] flex items-center touch-manipulation ${
                        location.pathname === item.url
                          ? "text-white translate-x-1"
                          : "text-white/50 hover:text-white/90 hover:translate-x-0.5"
                      }`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-14 sm:pt-16">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
