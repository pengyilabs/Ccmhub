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
import { SearchIcon, LogoutIcon, PlusIcon } from "./ActionIcons";
import { ChevronLeft, ChevronRight, Home, Building2, Calculator, BarChart3, HelpCircle, Settings } from "lucide-react";
import { DashboardEmptyState } from "./DashboardEmptyState";
import { NotificationsPopover } from "./NotificationsPopover";
import outletImage from "figma:asset/a1af56cf3de9fbc999c145ec81ac1ac3b0e4f1aa.png";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface DashboardProps {
  onLogout: () => void;
  onCreateOutlet: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  outlets: Outlet[];
}

export function Dashboard({ onLogout, onCreateOutlet, onNavigateToOutlets, onNavigateToCalculations, onNavigateToPerformance, onNavigateToSettings, onNavigateToHelp, outlets }: DashboardProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const hasOutlets = outlets.length > 0;

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  // If no outlets, show the empty state component
  if (!hasOutlets) {
    return (
      <>
        <DashboardEmptyState
          onLogout={handleLogoutClick}
          onNavigateToOutlets={onNavigateToOutlets}
          onNavigateToCalculations={onNavigateToCalculations}
          onNavigateToPerformance={onNavigateToPerformance}
          onCreateOutlet={onCreateOutlet}
        />
        
        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent className="bg-white border border-gray-200 shadow-2xl rounded-2xl max-w-md">
            <AlertDialogHeader>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl text-gray-900 mb-2">Overview</h1>
              <p className="text-gray-600">
                Overview of your outlets and recent activity.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {/* Total Outlets Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FDD42B] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#FDD42B]" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Outlets</p>
                <p className="text-2xl font-semibold text-gray-900">{outlets.length}</p>
                <p className="text-xs text-gray-500 mt-1">{outlets.length} outlet{outlets.length !== 1 ? 's' : ''} active</p>
                
                {/* Mini Chart - Only show if there are outlets */}
                {outlets.length > 0 && (
                  <div className="mt-4 flex items-end gap-1 h-12">
                    <div className="w-full bg-[#FDD42B] bg-opacity-20 rounded-sm" style={{ height: '40%' }}></div>
                    <div className="w-full bg-[#FDD42B] bg-opacity-30 rounded-sm" style={{ height: '60%' }}></div>
                    <div className="w-full bg-[#FDD42B] bg-opacity-40 rounded-sm" style={{ height: '45%' }}></div>
                    <div className="w-full bg-[#FDD42B] bg-opacity-50 rounded-sm" style={{ height: '80%' }}></div>
                    <div className="w-full bg-[#FDD42B] rounded-sm" style={{ height: '100%' }}></div>
                  </div>
                )}
              </div>

              {/* Active Services Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Active Services</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">No services configured</p>
              </div>

              {/* Pending Actions Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Pending Actions</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">All caught up</p>
              </div>

              {/* Latest Calculations Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Calculations</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">No calculations yet</p>
              </div>
            </div>

            {/* Outlets Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Section Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Outlets</h2>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onNavigateToOutlets}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-md"
                  >
                    View All
                  </Button>
                  <Button
                    onClick={onCreateOutlet}
                    className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-4 rounded-[8px] shadow-sm font-medium"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Outlet
                  </Button>
                </div>
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-700 font-medium">Image</TableHead>
                    <TableHead className="text-gray-700 font-medium">Outlet Name</TableHead>
                    <TableHead className="text-gray-700 font-medium">Address</TableHead>
                    <TableHead className="text-gray-700 font-medium">Campaign</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outlets.map((outlet) => (
                    <TableRow key={outlet.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="py-4">
                        <img src={outletImage} alt={outlet.name} className="w-12 h-12 object-cover rounded-md" />
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium">{outlet.name}</TableCell>
                      <TableCell className="text-gray-600">{outlet.address}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FDD42B] bg-opacity-20 text-gray-900">
                          {outlet.campaign}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Page 1 of 1
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="h-9 w-9 border border-gray-300 bg-white text-gray-400 cursor-not-allowed rounded-md"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="h-9 w-9 border border-gray-300 bg-white text-gray-400 cursor-not-allowed rounded-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-2xl rounded-2xl max-w-md">
        <AlertDialogHeader>
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
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