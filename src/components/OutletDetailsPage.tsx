import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SearchIcon, LogoutIcon, DownloadIcon } from "./ActionIcons";
import { 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Building2, 
  Calculator, 
  BarChart3, 
  HelpCircle, 
  Settings, 
  Eye, 
  Trash2,
  Users,
  TrendingUp,
  MousePointerClick,
  Percent,
  Edit
} from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface OutletDetailsPageProps {
  onLogout: () => void;
  onNavigateToOverview: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  outlet: Outlet | null;
}

export function OutletDetailsPage({ 
  onLogout, 
  onNavigateToOverview, 
  onNavigateToOutlets,
  onNavigateToCalculations,
  onNavigateToPerformance,
  onNavigateToSettings,
  onNavigateToHelp,
  outlet
}: OutletDetailsPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"performance" | "services" | "calculations">("services");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const handleOnboard = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleOffboard = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Default to first outlet if none provided
  const displayOutlet = outlet || {
    id: "1",
    name: "Campari",
    address: "Hans im Glück, Munich",
    campaign: "Campari"
  };

  return (
    <>
    <div className="h-[1024px] w-[1440px] bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FDD42B] rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-semibold text-lg">C</span>
            </div>
            <span className="text-gray-900 font-semibold text-lg">CCM HUB</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 flex flex-col">
          <div className="space-y-1">
            <button 
              onClick={onNavigateToOverview}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button 
              onClick={onNavigateToOutlets}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium"
            >
              <Building2 className="w-5 h-5" />
              <span>Outlets</span>
            </button>
            <button
              onClick={onNavigateToCalculations}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculations</span>
            </button>
            <button
              onClick={onNavigateToPerformance}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Performance</span>
            </button>
          </div>

          {/* Spacer to push bottom buttons down */}
          <div className="flex-1"></div>

          <Separator className="my-4 bg-gray-200" />

          <div className="space-y-1 mb-4">
            <button
              onClick={onNavigateToHelp}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </button>
            <button
              onClick={onNavigateToSettings}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <LogoutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-white border border-gray-300 rounded-md h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                />
              </div>
            </div>

            {/* Right Section: Notifications & Profile */}
            <div className="flex items-center gap-4">
              <NotificationsPopover />
              <div className="w-9 h-9 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToOutlets}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Outlets</span>
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900 font-medium">{displayOutlet.name}</span>
            </div>

            {/* A. Outlet Header Section */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex gap-6 mb-6">
                {/* Left: Image */}
                <div className="flex-shrink-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop" 
                    alt={displayOutlet.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Right: Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-3xl font-semibold text-gray-900 mb-2">{displayOutlet.name}</h1>
                      <p className="text-gray-600">{displayOutlet.address}</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FDD42B] bg-opacity-20 text-gray-900 mt-3">
                        {displayOutlet.campaign}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg h-10 px-4"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Outlet Info
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-gray-200 -mx-6 px-6 pt-5">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`pb-3 border-b-2 transition-colors font-medium $-{
                      activeTab === "services"
                        ? "border-[#FDD42B] text-gray-900"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab("performance")}
                    className={`pb-3 border-b-2 transition-colors font-medium ${
                      activeTab === "performance"
                        ? "border-[#FDD42B] text-gray-900"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => setActiveTab("calculations")}
                    className={`pb-3 border-b-2 transition-colors font-medium ${
                      activeTab === "calculations"
                        ? "border-[#FDD42B] text-gray-900"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Calculations
                  </button>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm font-bold">✓</span>
                </div>
                <p className="text-green-800 font-medium">Outlet successfully updated.</p>
              </div>
            )}

            {/* B. Service Overview Section */}
            {activeTab === "services" && (
              <>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Overview</h2>
                  
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">DCE Service</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        This service allows you to add or remove this outlet from the DCE list.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* C. Actions Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Actions</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Onboard Card */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ArrowUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Onboard Outlet</h3>
                          <p className="text-gray-600 text-sm">
                            Add this outlet to the DCE list.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleOnboard}
                        className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 rounded-[8px] h-11 shadow-lg font-semibold"
                      >
                        Onboard
                      </Button>
                    </div>

                    {/* Offboard Card */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ArrowDown className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Offboard Outlet</h3>
                          <p className="text-gray-600 text-sm">
                            Remove this outlet from the DCE list.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleOffboard}
                        variant="outline"
                        className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg h-11"
                      >
                        Offboard
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Performance Tab Content */}
            {activeTab === "performance" && (
              <>
                {/* Filters Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
                    <div className="flex items-center gap-3">
                      {/* Service Selector */}
                      <Select defaultValue="dce">
                        <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dce">DCE</SelectItem>
                          <SelectItem value="sarti">Sarti</SelectItem>
                          <SelectItem value="campaign-a">Campaign A</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Date Range */}
                      <div className="flex items-center gap-2">
                        <Input
                          type="date"
                          className="border border-gray-300 rounded-lg h-10 w-[140px] focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                          defaultValue="2024-11-01"
                        />
                        <span className="text-gray-600 text-sm">to</span>
                        <Input
                          type="date"
                          className="border border-gray-300 rounded-lg h-10 w-[140px] focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                          defaultValue="2024-11-11"
                        />
                      </div>

                      {/* Export Button */}
                      <Button
                        variant="outline"
                        className="border border-gray-300 hover:bg-gray-50 rounded-lg h-10"
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Subscribers KPI */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Subscribers</p>
                    <p className="text-2xl font-semibold text-gray-900 mb-1">11</p>
                    <p className="text-xs text-gray-500">+12% from last period</p>
                  </div>

                  {/* Redeemers KPI */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Redeemers</p>
                    <p className="text-2xl font-semibold text-gray-900 mb-1">0</p>
                    <p className="text-xs text-gray-500">+0% from last period</p>
                  </div>

                  {/* Review Clicks KPI */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                        <MousePointerClick className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Review Clicks</p>
                    <p className="text-2xl font-semibold text-gray-900 mb-1">0</p>
                    <p className="text-xs text-gray-500">+0% from last period</p>
                  </div>

                  {/* Ratio KPI */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Percent className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Ratio</p>
                    <p className="text-2xl font-semibold text-gray-900 mb-1">0.0%</p>
                    <p className="text-xs text-gray-500">+0% from last period</p>
                  </div>
                </div>

                {/* Performance Details */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">Subscribers</span>
                      </div>
                      <span className="text-gray-900 font-medium">11</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">Redeemers</span>
                      </div>
                      <span className="text-gray-900 font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">Review Clicks</span>
                      </div>
                      <span className="text-gray-900 font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">Ratio</span>
                      </div>
                      <span className="text-gray-900 font-medium">0.0%</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Calculations Tab Content */}
            {activeTab === "calculations" && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Calculations for {displayOutlet.name}</h2>
                </div>

                {/* Calculations Table */}
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200 bg-gray-50">
                      <TableHead className="text-gray-900 font-medium">Calculation ID</TableHead>
                      <TableHead className="text-gray-900 font-medium">Creation Date</TableHead>
                      <TableHead className="text-gray-900 font-medium">Number of Articles</TableHead>
                      <TableHead className="text-gray-900 font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-gray-900 font-medium">CALC-001</TableCell>
                      <TableCell className="text-gray-600">2024-11-05</TableCell>
                      <TableCell className="text-gray-900">12</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-gray-900 font-medium">CALC-003</TableCell>
                      <TableCell className="text-gray-600">2024-11-10</TableCell>
                      <TableCell className="text-gray-900">15</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-2xl rounded-2xl max-w-md">
        <AlertDialogHeader>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogoutIcon className="w-6 h-6 text-gray-600" />
          </div>
          <AlertDialogTitle className="text-gray-900 text-xl font-semibold text-center">Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-center">
            Your session will be closed and you will need to log in again to access the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
          <AlertDialogCancel className="mt-0 flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg h-11">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg h-11 shadow-lg"
          >
            Yes, log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
