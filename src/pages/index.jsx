import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import LiveDemo from "./LiveDemo";

import Calendar from "./Calendar";

import CallHistory from "./CallHistory";

import Settings from "./Settings";

import Analytics from "./Analytics";

import Home from "./Home";

import CustomerView from "./CustomerView";

import Guide from "./Guide";

import Appointments from "./Appointments";

import Pricing from "./Pricing";

import Search from "./Search";

import ServiceRecords from "./ServiceRecords";

import KnowledgeBase from "./KnowledgeBase";

import WebsiteAnalyzer from "./WebsiteAnalyzer";

import ReputationManager from "./ReputationManager";

import SEOIntelligence from "./SEOIntelligence";

import ProactiveOutreach from "./ProactiveOutreach";

import BusinessIntelligence from "./BusinessIntelligence";

import ProductIntelligence from "./ProductIntelligence";

import RetentionEngine from "./RetentionEngine";

import AdvancedAnalytics from "./AdvancedAnalytics";

import SquareSetup from "./SquareSetup";

import SystemStatus from "./SystemStatus";

import Channels from "./Channels";

import ConnectSquare from "./ConnectSquare";

import AutoDiscoveryReport from "./AutoDiscoveryReport";

import Products from "./Products";

import Campaigns from "./Campaigns";

import CampaignAnalytics from "./CampaignAnalytics";

import VoiceGeoRank from "./VoiceGeoRank";

import Book from "./Book";

import ServiceIntelligence from "./ServiceIntelligence";

import StylistPerformance from "./StylistPerformance";

import connect-square from "./connect-square";

import Clients from "./Clients";

import CallCenter from "./CallCenter";

import AIAssistant from "./AIAssistant";

import FeedbackManager from "./FeedbackManager";

import SaasOnboarding from "./SaasOnboarding";

import SaasDashboard from "./SaasDashboard";

import SaasOnboardingSuccess from "./SaasOnboardingSuccess";

import SaasClientAutomations from "./SaasClientAutomations";

import ConciergeWidget from "./ConciergeWidget";

import SaasAnalytics from "./SaasAnalytics";

import SystemHealth from "./SystemHealth";

import AgencyLanding from "./AgencyLanding";

import AgencyDashboard from "./AgencyDashboard";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    LiveDemo: LiveDemo,
    
    Calendar: Calendar,
    
    CallHistory: CallHistory,
    
    Settings: Settings,
    
    Analytics: Analytics,
    
    Home: Home,
    
    CustomerView: CustomerView,
    
    Guide: Guide,
    
    Appointments: Appointments,
    
    Pricing: Pricing,
    
    Search: Search,
    
    ServiceRecords: ServiceRecords,
    
    KnowledgeBase: KnowledgeBase,
    
    WebsiteAnalyzer: WebsiteAnalyzer,
    
    ReputationManager: ReputationManager,
    
    SEOIntelligence: SEOIntelligence,
    
    ProactiveOutreach: ProactiveOutreach,
    
    BusinessIntelligence: BusinessIntelligence,
    
    ProductIntelligence: ProductIntelligence,
    
    RetentionEngine: RetentionEngine,
    
    AdvancedAnalytics: AdvancedAnalytics,
    
    SquareSetup: SquareSetup,
    
    SystemStatus: SystemStatus,
    
    Channels: Channels,
    
    ConnectSquare: ConnectSquare,
    
    AutoDiscoveryReport: AutoDiscoveryReport,
    
    Products: Products,
    
    Campaigns: Campaigns,
    
    CampaignAnalytics: CampaignAnalytics,
    
    VoiceGeoRank: VoiceGeoRank,
    
    Book: Book,
    
    ServiceIntelligence: ServiceIntelligence,
    
    StylistPerformance: StylistPerformance,
    
    connect-square: connect-square,
    
    Clients: Clients,
    
    CallCenter: CallCenter,
    
    AIAssistant: AIAssistant,
    
    FeedbackManager: FeedbackManager,
    
    SaasOnboarding: SaasOnboarding,
    
    SaasDashboard: SaasDashboard,
    
    SaasOnboardingSuccess: SaasOnboardingSuccess,
    
    SaasClientAutomations: SaasClientAutomations,
    
    ConciergeWidget: ConciergeWidget,
    
    SaasAnalytics: SaasAnalytics,
    
    SystemHealth: SystemHealth,
    
    AgencyLanding: AgencyLanding,
    
    AgencyDashboard: AgencyDashboard,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/LiveDemo" element={<LiveDemo />} />
                
                <Route path="/Calendar" element={<Calendar />} />
                
                <Route path="/CallHistory" element={<CallHistory />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/CustomerView" element={<CustomerView />} />
                
                <Route path="/Guide" element={<Guide />} />
                
                <Route path="/Appointments" element={<Appointments />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/Search" element={<Search />} />
                
                <Route path="/ServiceRecords" element={<ServiceRecords />} />
                
                <Route path="/KnowledgeBase" element={<KnowledgeBase />} />
                
                <Route path="/WebsiteAnalyzer" element={<WebsiteAnalyzer />} />
                
                <Route path="/ReputationManager" element={<ReputationManager />} />
                
                <Route path="/SEOIntelligence" element={<SEOIntelligence />} />
                
                <Route path="/ProactiveOutreach" element={<ProactiveOutreach />} />
                
                <Route path="/BusinessIntelligence" element={<BusinessIntelligence />} />
                
                <Route path="/ProductIntelligence" element={<ProductIntelligence />} />
                
                <Route path="/RetentionEngine" element={<RetentionEngine />} />
                
                <Route path="/AdvancedAnalytics" element={<AdvancedAnalytics />} />
                
                <Route path="/SquareSetup" element={<SquareSetup />} />
                
                <Route path="/SystemStatus" element={<SystemStatus />} />
                
                <Route path="/Channels" element={<Channels />} />
                
                <Route path="/ConnectSquare" element={<ConnectSquare />} />
                
                <Route path="/AutoDiscoveryReport" element={<AutoDiscoveryReport />} />
                
                <Route path="/Products" element={<Products />} />
                
                <Route path="/Campaigns" element={<Campaigns />} />
                
                <Route path="/CampaignAnalytics" element={<CampaignAnalytics />} />
                
                <Route path="/VoiceGeoRank" element={<VoiceGeoRank />} />
                
                <Route path="/Book" element={<Book />} />
                
                <Route path="/ServiceIntelligence" element={<ServiceIntelligence />} />
                
                <Route path="/StylistPerformance" element={<StylistPerformance />} />
                
                <Route path="/connect-square" element={<connect-square />} />
                
                <Route path="/Clients" element={<Clients />} />
                
                <Route path="/CallCenter" element={<CallCenter />} />
                
                <Route path="/AIAssistant" element={<AIAssistant />} />
                
                <Route path="/FeedbackManager" element={<FeedbackManager />} />
                
                <Route path="/SaasOnboarding" element={<SaasOnboarding />} />
                
                <Route path="/SaasDashboard" element={<SaasDashboard />} />
                
                <Route path="/SaasOnboardingSuccess" element={<SaasOnboardingSuccess />} />
                
                <Route path="/SaasClientAutomations" element={<SaasClientAutomations />} />
                
                <Route path="/ConciergeWidget" element={<ConciergeWidget />} />
                
                <Route path="/SaasAnalytics" element={<SaasAnalytics />} />
                
                <Route path="/SystemHealth" element={<SystemHealth />} />
                
                <Route path="/AgencyLanding" element={<AgencyLanding />} />
                
                <Route path="/AgencyDashboard" element={<AgencyDashboard />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}