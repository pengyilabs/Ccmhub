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
import { PlaceholderIcon } from "./PlaceholderIcon";
import { SearchIcon, BellIcon, LogoutIcon, DownloadIcon } from "./ActionIcons";
import { LayoutGrid, LayoutList, Home, Building2, Calculator, BarChart3, HelpCircle, Settings, Users, TrendingUp, MousePointerClick, Percent } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";

interface OutletPerformance {
  gid: string;
  outlet: string;
  campaign: string;
  subscribers: number;
  redeemers: number;
  reviewClicks: number;
  ratio: number;
}

interface PerformancePageProps {
  onLogout: () => void;
  onNavigateToOverview: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  outlets: any[];
}

export function PerformancePage({ 
  onLogout, 
  onNavigateToOverview, 
  onNavigateToOutlets,
  onNavigateToCalculations,
  onNavigateToSettings,
  onNavigateToHelp,
  outlets
}: PerformancePageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedService, setSelectedService] = useState("dce");

  const hasOutlets = outlets && outlets.length > 0;

  // Sample performance data - Start with empty array
  const [performanceData, setPerformanceData] = useState<OutletPerformance[]>([]);

  const hasData = performanceData.length > 0;

  // Calculate KPIs
  const totalSubscribers = performanceData.reduce((sum, item) => sum + item.subscribers, 0);
  const totalRedeemers = performanceData.reduce((sum, item) => sum + item.redeemers, 0);
  const totalReviewClicks = performanceData.reduce((sum, item) => sum + item.reviewClicks, 0);
  const averageRatio = performanceData.length > 0 
    ? performanceData.reduce((sum, item) => sum + item.ratio, 0) / performanceData.length 
    : 0;

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
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
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl text-gray-900 mb-1">Outlet Performance</h1>
                  <p className="text-gray-600">Service: {selectedService.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Service Selector */}
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-[180px] border border-gray-300 rounded-md h-10">
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
                      className="border border-gray-300 rounded-md h-10 w-[140px] focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                      defaultValue="2024-11-01"
                    />
                    <span className="text-gray-600">to</span>
                    <Input
                      type="date"
                      className="border border-gray-300 rounded-md h-10 w-[140px] focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                      defaultValue="2024-11-11"
                    />
                  </div>

                  {/* Export Button */}
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 rounded-md"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>

            {!hasOutlets ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl text-gray-900 mb-3">No performance data yet</h2>
                <p className="text-gray-600 text-center max-w-lg">
                  Once your outlets and services are active, you'll see performance stats here.
                </p>
              </div>
            ) : (
              <>
                {/* KPI Summary Section */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                  {/* Subscribers KPI */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Subscribers</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalSubscribers}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last period</p>
                  </div>

                  {/* Redeemers KPI */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Redeemers</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalRedeemers}</p>
                    <p className="text-xs text-green-600 mt-1">+5% from last period</p>
                  </div>

                  {/* Review Clicks KPI */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                        <MousePointerClick className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Review Clicks</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalReviewClicks}</p>
                    <p className="text-xs text-green-600 mt-1">+18% from last period</p>
                  </div>

                  {/* Average Ratio KPI */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-[#FDD42B] bg-opacity-10 rounded-lg flex items-center justify-center">
                        <Percent className="w-6 h-6 text-[#FDD42B]" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Average Ratio</p>
                    <p className="text-2xl font-semibold text-gray-900">{averageRatio.toFixed(1)}%</p>
                    <p className="text-xs text-green-600 mt-1">+3% from last period</p>
                  </div>
                </div>

                {/* Performance Details Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  {/* Section Header with View Toggle */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Performance Details</h2>
                    <div className="flex items-center gap-0 border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("cards")}
                        className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                          viewMode === "cards"
                            ? "bg-[#FDD42B] text-gray-900"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                        Cards
                      </button>
                      <button
                        onClick={() => setViewMode("table")}
                        className={`px-4 py-2 flex items-center gap-2 transition-colors border-l border-gray-300 ${
                          viewMode === "table"
                            ? "bg-[#FDD42B] text-gray-900"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <LayoutList className="w-4 h-4" />
                        Table
                      </button>
                    </div>
                  </div>

                  {/* Content: Cards or Table */}
                  {viewMode === "cards" ? (
                    // Card View
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {performanceData.map((outlet) => (
                          <div
                            key={outlet.gid}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-5"
                          >
                            <h3 className="font-medium text-gray-900 mb-4">{outlet.outlet}</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Subscribers</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{outlet.subscribers}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Redeemers</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{outlet.redeemers}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <MousePointerClick className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Review Clicks</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{outlet.reviewClicks}</span>
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                  <Percent className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">Ratio</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{outlet.ratio.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Table View
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-gray-200">
                          <TableHead className="text-gray-700 font-medium">GID</TableHead>
                          <TableHead className="text-gray-700 font-medium">Outlet</TableHead>
                          <TableHead className="text-gray-700 font-medium">Campaign</TableHead>
                          <TableHead className="text-gray-700 font-medium">Subscribers</TableHead>
                          <TableHead className="text-gray-700 font-medium">Redeemers</TableHead>
                          <TableHead className="text-gray-700 font-medium">Review Clicks</TableHead>
                          <TableHead className="text-gray-700 font-medium">Ratio [%]</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceData.map((outlet) => (
                          <TableRow key={outlet.gid} className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="text-gray-900 font-medium">{outlet.gid}</TableCell>
                            <TableCell className="text-gray-900 font-medium">{outlet.outlet}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FDD42B] bg-opacity-20 text-gray-900">
                                {outlet.campaign}
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-600">{outlet.subscribers}</TableCell>
                            <TableCell className="text-gray-600">{outlet.redeemers}</TableCell>
                            <TableCell className="text-gray-600">{outlet.reviewClicks}</TableCell>
                            <TableCell className="text-gray-600">{outlet.ratio.toFixed(1)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-900">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLogout}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}