import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, BellIcon, LogoutIcon, PlusIcon } from "./ActionIcons";
import { Home, Building2, Calculator, BarChart3, HelpCircle, Settings, TrendingUp, Activity, Clock } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";

interface DashboardEmptyStateProps {
  onLogout: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onCreateOutlet: () => void;
}

export function DashboardEmptyState({
  onLogout,
  onNavigateToOutlets,
  onNavigateToCalculations,
  onNavigateToPerformance,
  onCreateOutlet
}: DashboardEmptyStateProps) {
  return (
    <div className="flex h-full w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FDD42B] rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold">C</span>
            </div>
            <span className="text-gray-900 font-semibold">CCM HUB</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg transition-colors">
            <Home className="w-5 h-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={onNavigateToOutlets}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Building2 className="w-5 h-5" />
            <span>Outlets</span>
          </button>
          <button
            onClick={onNavigateToCalculations}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculations</span>
          </button>
          <button
            onClick={onNavigateToPerformance}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Performance</span>
          </button>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-10 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-white border border-gray-300 rounded-lg h-11 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                />
              </div>
            </div>

            {/* Right Section: Notifications & Profile */}
            <div className="flex items-center gap-5">
              <NotificationsPopover />
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-gray-600 font-medium">U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl text-gray-900 mb-3">Welcome to CCM HUB</h1>
              <p className="text-gray-600">
                You don't have any data yet. Start by creating an outlet or exploring services.
              </p>
            </div>

            {/* Recent Activity Section */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-semibold">Recent Activity</h3>
                <Button
                  onClick={onCreateOutlet}
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-semibold"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create outlet
                </Button>
              </div>
              
              {/* Four Graph Cards - Empty State */}
              <div className="grid grid-cols-4 gap-4">
                {/* Total Outlets Card */}
                <div className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm flex flex-col">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Total Outlets</h4>
                  <div className="flex-1 bg-gray-50 rounded-lg mb-3 flex items-center justify-center min-h-[80px]">
                    <Building2 className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">No data available</p>
                </div>

                {/* Active Services Card */}
                <div className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm flex flex-col">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Active Services</h4>
                  <div className="flex-1 bg-gray-50 rounded-lg mb-3 flex items-center justify-center min-h-[80px]">
                    <Activity className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">No data available</p>
                </div>

                {/* Pending Actions Card */}
                <div className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm flex flex-col">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Pending Actions</h4>
                  <div className="flex-1 bg-gray-50 rounded-lg mb-3 flex items-center justify-center min-h-[80px]">
                    <Clock className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">No data available</p>
                </div>

                {/* Latest Calculations Card */}
                <div className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm flex flex-col">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Latest Calculations</h4>
                  <div className="flex-1 bg-gray-50 rounded-lg mb-3 flex items-center justify-center min-h-[80px]">
                    <Calculator className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">No data available</p>
                </div>
              </div>
            </div>

            {/* Outlets Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-semibold">Outlets</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    disabled
                    className="border border-gray-300 bg-white text-gray-400 cursor-not-allowed h-10 px-4 rounded-lg opacity-50"
                  >
                    View All Outlets
                  </Button>
                  <Button
                    variant="outline"
                    disabled
                    className="border border-gray-300 bg-white text-gray-400 cursor-not-allowed h-10 px-4 rounded-lg opacity-50"
                  >
                    Open Calculations
                  </Button>
                  <Button
                    onClick={onCreateOutlet}
                    className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-semibold"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New Outlet
                  </Button>
                </div>
              </div>

              {/* Table with Empty State */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm relative" style={{ minHeight: '320px' }}>
                {/* Table Header */}
                <div className="border-b border-gray-200 px-6 py-4 grid grid-cols-4 gap-4 bg-gray-50 rounded-t-xl">
                  <div className="text-sm font-medium text-gray-700">Image</div>
                  <div className="text-sm font-medium text-gray-700">Outlet Name</div>
                  <div className="text-sm font-medium text-gray-700">Address</div>
                  <div className="text-sm font-medium text-gray-700">Campaign</div>
                </div>

                {/* Empty State Overlay */}
                <div className="absolute inset-0 top-14 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl text-gray-900 mb-3">No Outlets Yet</h2>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    Get started by creating your first outlet to manage your restaurant locations.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={onCreateOutlet}
                      className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-full shadow-lg font-semibold"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Create an Outlet
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-gray-300 hover:bg-gray-50 h-11 px-8 rounded-lg"
                    >
                      Help
                    </Button>
                  </div>
                </div>

                {/* Pagination at bottom */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 px-6 py-4 bg-white rounded-b-xl flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing 0 of 0 outlets</div>
                  <div className="flex gap-2 opacity-50">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled
                      className="h-9 w-9 border border-gray-300 bg-white text-gray-400 cursor-not-allowed rounded-lg"
                    >
                      ‹
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled
                      className="h-9 w-9 border border-gray-300 bg-white text-gray-400 cursor-not-allowed rounded-lg"
                    >
                      ›
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}