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
import { SearchIcon, LogoutIcon, PlusIcon } from "./ActionIcons";
import { ChevronLeft, ChevronRight, Home, Building2, Calculator, BarChart3, HelpCircle, Settings, Filter, Trash2, Eye } from "lucide-react";
import { NewCalculationModal } from "./NewCalculationModal";
import { CalculationDetailsModal } from "./CalculationDetailsModal";
import { CalculationSavedModal } from "./CalculationSavedModal";
import { NotificationsPopover } from "./NotificationsPopover";

interface Calculation {
  id: string;
  creationDate: string;
  numberOfArticles: number;
}

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface CalculationsPageProps {
  onLogout: () => void;
  onNavigateToOverview: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  outlets: Outlet[];
}

export function CalculationsPage({ 
  onLogout, 
  onNavigateToOverview, 
  onNavigateToOutlets,
  onNavigateToPerformance,
  onNavigateToSettings,
  onNavigateToHelp,
  outlets 
}: CalculationsPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showNewCalculationModal, setShowNewCalculationModal] = useState(false);
  const [calculationToDelete, setCalculationToDelete] = useState<string | null>(null);
  const [showCalculationDetailsModal, setShowCalculationDetailsModal] = useState(false);
  const [calculationDetailsId, setCalculationDetailsId] = useState<string | null>(null);
  const [showCalculationSavedModal, setShowCalculationSavedModal] = useState(false);
  const [lastCreatedCalculationId, setLastCreatedCalculationId] = useState<string | null>(null);
  const hasOutlets = outlets.length > 0;

  // Sample data for populated state - Start with empty array
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const handleDeleteClick = (id: string) => {
    setCalculationToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (calculationToDelete) {
      setCalculations(calculations.filter(calc => calc.id !== calculationToDelete));
      setCalculationToDelete(null);
    }
    setShowDeleteDialog(false);
  };

  const handleViewDetails = (id: string) => {
    setCalculationDetailsId(id);
    setShowCalculationDetailsModal(true);
  };

  const handleSaveCalculation = (calculationData: any) => {
    // Add the new calculation to the list
    const newCalculation: Calculation = {
      id: `CALC-${String(calculations.length + 1).padStart(3, '0')}`,
      creationDate: new Date().toISOString().split('T')[0],
      numberOfArticles: calculationData.articles.length
    };
    setCalculations([...calculations, newCalculation]);
    setLastCreatedCalculationId(newCalculation.id);
    setShowCalculationSavedModal(true);
  };

  const handleSaveCalculationDetails = (calculationData: any) => {
    // Update the calculation in the list
    console.log("Saving calculation details:", calculationData);
  };

  const handleDeleteCalculationFromDetails = (id: string) => {
    setCalculations(calculations.filter(calc => calc.id !== id));
  };

  // Get full calculation details for the modal
  const getCalculationDetails = (id: string | null) => {
    if (!id) return null;
    
    // Sample detailed data - in real app this would come from API
    return {
      id: id,
      creationDate: "2025-10-21 16:47:53",
      placeId: "PLC-2024-78945",
      outlet: outlets[0] || { id: "1", name: "Sample Outlet", address: "123 Main St", campaign: "Campaign A" },
      articles: [
        { id: "1", name: "APEROL SPRITZ LIGHT WALL SIGN 2019", description: "Information about article goes here...", pieces: "24", boxes: "2", bottles: "48", amount: "1200.50" },
        { id: "2", name: "APEROL SPRITZ PILLOW SET", description: "Information about article goes here...", pieces: "12", boxes: "1", bottles: "12", amount: "450.00" },
        { id: "3", name: "APEROL SPRITZ BOT-GLASSGLORIFIER", description: "Information about article goes here...", pieces: "18", boxes: "2", bottles: "36", amount: "890.75" },
      ],
      notes: "This is a sample calculation with multiple articles. All inventory has been verified and counted."
    };
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
              <h1 className="text-3xl text-gray-900 mb-2">Calculations</h1>
              <p className="text-gray-600">
                Manage and view all your inventory calculations.
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Search and Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search calculations..."
                    className="pl-9 w-64 bg-white border border-gray-300 rounded-md h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                    disabled={!hasOutlets}
                  />
                </div>
                <Select disabled={!hasOutlets}>
                  <SelectTrigger className="w-[180px] border border-gray-300 rounded-md h-10">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <SelectValue placeholder="Filter by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* New Calculation Button */}
              <Button
                className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-medium"
                disabled={!hasOutlets}
                onClick={() => setShowNewCalculationModal(true)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Calculation
              </Button>
            </div>

            {/* Content: Empty State or Table */}
            {!hasOutlets ? (
              // Empty State - No Outlets
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl text-gray-900 mb-3">No calculations available</h2>
                <p className="text-gray-600 text-center max-w-lg">
                  Create your first outlet to start making calculations.
                </p>
              </div>
            ) : calculations.length === 0 ? (
              // Empty State - Has Outlets but No Calculations
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl text-gray-900 mb-3">No calculations yet</h2>
                <p className="text-gray-600 text-center max-w-lg mb-8">
                  Get started by creating your first calculation for one of your outlets.
                </p>
                <Button
                  onClick={() => setShowNewCalculationModal(true)}
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-[8px] shadow-lg font-semibold"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create First Calculation
                </Button>
              </div>
            ) : (
              // Populated State - Table
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="text-gray-700 font-medium">ID Number</TableHead>
                      <TableHead className="text-gray-700 font-medium">Creation Date</TableHead>
                      <TableHead className="text-gray-700 font-medium">Number of Articles</TableHead>
                      <TableHead className="text-gray-700 font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculations.map((calculation) => (
                      <TableRow key={calculation.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="text-gray-900 font-medium">{calculation.id}</TableCell>
                        <TableCell className="text-gray-600">{calculation.creationDate}</TableCell>
                        <TableCell className="text-gray-600">{calculation.numberOfArticles}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteClick(calculation.id)}
                              className="border border-gray-300 hover:bg-gray-50 h-9 px-3 rounded-md"
                            >
                              <Trash2 className="w-4 h-4 mr-1.5" />
                              Delete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(calculation.id)}
                              className="border border-gray-300 hover:bg-gray-50 h-9 px-3 rounded-md"
                            >
                              <Eye className="w-4 h-4 mr-1.5" />
                              View Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium text-gray-900">{calculations.length}</span> of{" "}
                    <span className="font-medium text-gray-900">{calculations.length}</span> calculations
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border border-gray-300 h-9 px-3 rounded-md"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 border border-[#FDD42B] bg-[#FDD42B] text-gray-900 rounded-md"
                      >
                        1
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border border-gray-300 h-9 px-3 rounded-md"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
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

    {/* Delete Confirmation Dialog */}
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Delete Calculation</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete this calculation? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-900">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    {/* New Calculation Modal */}
    <NewCalculationModal
      open={showNewCalculationModal}
      onOpenChange={setShowNewCalculationModal}
      outlets={outlets}
      onSave={handleSaveCalculation}
    />

    {/* Calculation Details Modal */}
    <CalculationDetailsModal
      open={showCalculationDetailsModal}
      onOpenChange={setShowCalculationDetailsModal}
      calculation={getCalculationDetails(calculationDetailsId)}
      onSave={handleSaveCalculationDetails}
      onDelete={handleDeleteCalculationFromDetails}
    />

    {/* Calculation Saved Modal */}
    <CalculationSavedModal
      open={showCalculationSavedModal}
      onOpenChange={setShowCalculationSavedModal}
      calculationId={lastCreatedCalculationId}
      onViewDetails={() => {
        if (lastCreatedCalculationId) {
          setCalculationDetailsId(lastCreatedCalculationId);
          setShowCalculationDetailsModal(true);
        }
      }}
    />
    </>
  );
}