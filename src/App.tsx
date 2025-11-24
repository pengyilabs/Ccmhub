import { useState } from "react";
import { RegistrationPage } from "./components/RegistrationPage";
import { LoginPage } from "./components/LoginPage";
import { VerificationPage } from "./components/VerificationPage";
import { Dashboard } from "./components/Dashboard";
import { OutletsPage } from "./components/OutletsPage";
import { OutletDetailsPage } from "./components/OutletDetailsPage";
import { CalculationsPage } from "./components/CalculationsPage";
import { PerformancePage } from "./components/PerformancePage";
import { SettingsPage } from "./components/SettingsPage";
import { HelpPage } from "./components/HelpPage";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { CreateOutletModal } from "./components/CreateOutletModal";

type AppView = "login" | "register" | "verification" | "dashboard" | "outlets" | "outlet-details" | "calculations" | "performance" | "settings" | "help";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("login");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCreateOutletModal, setShowCreateOutletModal] = useState(false);
  const [fromOnboarding, setFromOnboarding] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);

  const handleRegistrationSuccess = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setCurrentView("verification");
  };

  const handleVerificationSuccess = () => {
    setCurrentView("dashboard");
    setShowOnboarding(true);
  };

  const handleLoginSuccess = () => {
    setCurrentView("dashboard");
    // Pre-populate with existing outlet data for logged-in users
    setOutlets([
      {
        id: "1",
        name: "Campari",
        address: "Hans im Glück, Munich",
        campaign: "Campari"
      }
    ]);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const handleOpenCreateOutletModal = () => {
    setShowCreateOutletModal(true);
    setFromOnboarding(false);
  };

  const handleOpenCreateOutletFromOnboarding = () => {
    setShowCreateOutletModal(true);
    setFromOnboarding(true);
  };

  const handleCloseCreateOutletModal = () => {
    setShowCreateOutletModal(false);
    // If opened from onboarding, complete the onboarding when modal closes
    if (fromOnboarding) {
      setShowOnboarding(false);
      setFromOnboarding(false);
    }
  };

  const handleOutletCreated = (outletData: { campaign: string; location: string }) => {
    // Create a new outlet with the data
    const newOutlet: Outlet = {
      id: Date.now().toString(),
      name: outletData.campaign.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      address: outletData.location,
      campaign: outletData.campaign.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    };
    setOutlets(prev => [...prev, newOutlet]);
  };

  const handleNavigateToOutlets = () => {
    setCurrentView("outlets");
  };

  const handleNavigateToOverview = () => {
    setCurrentView("dashboard");
  };

  const handleNavigateToCalculations = () => {
    setCurrentView("calculations");
  };

  const handleNavigateToPerformance = () => {
    setCurrentView("performance");
  };

  const handleLogout = () => {
    setShowOnboarding(false);
    setCurrentView("login");
  };

  const handleSelectOutlet = (outletId: string) => {
    setSelectedOutletId(outletId);
    setCurrentView("outlet-details");
  };

  return (
    <div className="min-h-screen w-full bg-gray-300 flex items-center justify-center">
      <div className="w-[1440px] h-[1024px] overflow-hidden bg-gray-100">
        {currentView === "login" && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setCurrentView("register")}
          />
        )}
        {currentView === "register" && (
          <RegistrationPage
            onRegistrationSuccess={handleRegistrationSuccess}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        )}
        {currentView === "verification" && (
          <VerificationPage
            email={userEmail}
            onVerificationSuccess={handleVerificationSuccess}
            onBackToRegistration={() => setCurrentView("register")}
          />
        )}
        {currentView === "dashboard" && (
          <>
            <Dashboard 
              onLogout={() => {
                setShowOnboarding(false);
                setCurrentView("login");
              }}
              onCreateOutlet={handleOpenCreateOutletModal}
              onNavigateToOutlets={handleNavigateToOutlets}
              outlets={outlets}
              onNavigateToCalculations={handleNavigateToCalculations}
              onNavigateToPerformance={handleNavigateToPerformance}
              onNavigateToSettings={() => setCurrentView("settings")}
              onNavigateToHelp={() => setCurrentView("help")}
            />
            {showOnboarding && !showCreateOutletModal && (
              <OnboardingFlow
                onComplete={handleOnboardingComplete}
                onSkip={handleOnboardingSkip}
                onOpenCreateOutlet={handleOpenCreateOutletFromOnboarding}
              />
            )}
            {showCreateOutletModal && (
              <CreateOutletModal
                onClose={handleCloseCreateOutletModal}
                onSuccess={handleOutletCreated}
              />
            )}
          </>
        )}
        {currentView === "outlets" && (
          <>
            <OutletsPage
              onLogout={() => {
                setCurrentView("login");
              }}
              onNavigateToOverview={handleNavigateToOverview}
              onNavigateToCalculations={handleNavigateToCalculations}
              onNavigateToPerformance={handleNavigateToPerformance}
              onCreateOutlet={handleOpenCreateOutletModal}
              outlets={outlets}
              onViewOutletDetails={handleSelectOutlet}
              onNavigateToSettings={() => setCurrentView("settings")}
              onNavigateToHelp={() => setCurrentView("help")}
            />
            {showCreateOutletModal && (
              <CreateOutletModal
                onClose={handleCloseCreateOutletModal}
                onSuccess={handleOutletCreated}
              />
            )}
          </>
        )}
        {currentView === "outlet-details" && (
          <OutletDetailsPage
            onLogout={() => {
              setCurrentView("login");
            }}
            onNavigateToOverview={handleNavigateToOverview}
            onNavigateToOutlets={handleNavigateToOutlets}
            onNavigateToCalculations={handleNavigateToCalculations}
            onNavigateToPerformance={handleNavigateToPerformance}
            onNavigateToSettings={() => setCurrentView("settings")}
            onNavigateToHelp={() => setCurrentView("help")}
            outlet={outlets.find(o => o.id === selectedOutletId) || null}
          />
        )}
        {currentView === "calculations" && (
          <CalculationsPage
            onLogout={() => {
              setCurrentView("login");
            }}
            onNavigateToOverview={handleNavigateToOverview}
            onNavigateToOutlets={handleNavigateToOutlets}
            onNavigateToPerformance={handleNavigateToPerformance}
            onNavigateToSettings={() => setCurrentView("settings")}
            onNavigateToHelp={() => setCurrentView("help")}
            outlets={outlets}
          />
        )}
        {currentView === "performance" && (
          <PerformancePage
            onLogout={handleLogout}
            onNavigateToOverview={handleNavigateToOverview}
            onNavigateToOutlets={handleNavigateToOutlets}
            onNavigateToCalculations={handleNavigateToCalculations}
            onNavigateToSettings={() => setCurrentView("settings")}
            onNavigateToHelp={() => setCurrentView("help")}
            outlets={outlets}
          />
        )}
        {currentView === "settings" && (
          <SettingsPage
            onLogout={handleLogout}
            onNavigateToOverview={() => setCurrentView("dashboard")}
            onNavigateToOutlets={() => setCurrentView("outlets")}
            onNavigateToCalculations={() => setCurrentView("calculations")}
            onNavigateToPerformance={() => setCurrentView("performance")}
            onNavigateToHelp={() => setCurrentView("help")}
          />
        )}
        {currentView === "help" && (
          <HelpPage
            onLogout={handleLogout}
            onNavigateToOverview={() => setCurrentView("dashboard")}
            onNavigateToOutlets={() => setCurrentView("outlets")}
            onNavigateToCalculations={() => setCurrentView("calculations")}
            onNavigateToPerformance={() => setCurrentView("performance")}
            onNavigateToSettings={() => setCurrentView("settings")}
          />
        )}
      </div>
    </div>
  );
}