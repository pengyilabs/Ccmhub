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
import { ChevronLeft, ChevronRight, Home, Building2, Calculator, BarChart3, HelpCircle, Settings, Filter, Download } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";
import outletImage from "figma:asset/a1af56cf3de9fbc999c145ec81ac1ac3b0e4f1aa.png";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface OutletsPageProps {
  onLogout: () => void;
  onCreateOutlet: () => void;
  onNavigateToOverview: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  onViewOutletDetails: (outletId: string) => void;
  outlets: Outlet[];
}

export function OutletsPage({ onLogout, onCreateOutlet, onNavigateToOverview, onNavigateToCalculations, onNavigateToPerformance, onNavigateToSettings, onNavigateToHelp, onViewOutletDetails, outlets }: OutletsPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const hasOutlets = outlets.length > 0;

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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl text-gray-900">Outlets</h1>
                <Button
                  onClick={onCreateOutlet}
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-medium"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Outlet
                </Button>
              </div>
              <p className="text-gray-600">
                Manage all your restaurant outlets and their information.
              </p>
            </div>

            {/* Filters and Actions Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 rounded-md"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search outlets..."
                    className="pl-9 pr-4 bg-white border border-gray-300 rounded-md h-10 w-64 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  disabled={!hasOutlets}
                  className={`border border-gray-300 bg-white h-10 px-4 rounded-md ${!hasOutlets ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Outlets Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {hasOutlets ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="text-gray-700 font-medium w-[80px]">Image</TableHead>
                        <TableHead className="text-gray-700 font-medium">Outlet Name</TableHead>
                        <TableHead className="text-gray-700 font-medium">Address</TableHead>
                        <TableHead className="text-gray-700 font-medium">Campaign</TableHead>
                        <TableHead className="text-gray-700 font-medium w-[120px]">Status</TableHead>
                        <TableHead className="text-gray-700 font-medium w-[140px]">Actions</TableHead>
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
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => onViewOutletDetails(outlet.id)}
                              variant="outline"
                              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-9 px-3 text-sm rounded-md"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Showing {outlets.length} of {outlets.length} outlet{outlets.length !== 1 ? 's' : ''}
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
                </>
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl text-gray-900 mb-3">No outlets found</h2>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    Create a new outlet to start managing your locations.
                  </p>
                  <Button
                    onClick={onCreateOutlet}
                    className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-6 rounded-[8px] shadow-sm font-medium"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Outlet
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Your session will be closed and you will need to log in again to access the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-900">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLogout}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Yes, log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
