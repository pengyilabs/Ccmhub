import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
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
import { Switch } from "./ui/switch";
import { SearchIcon, LogoutIcon, EditIcon, TrashIcon } from "./ActionIcons";
import { NotificationsPopover } from "./NotificationsPopover";
import { Home, Building2, Calculator, BarChart3, HelpCircle, Settings, Edit2, Trash2, UserPlus } from "lucide-react";

interface SettingsPageProps {
  onLogout: () => void;
  onNavigateToOverview: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToHelp: () => void;
}

export function SettingsPage({ 
  onLogout, 
  onNavigateToOverview, 
  onNavigateToOutlets,
  onNavigateToCalculations,
  onNavigateToPerformance,
  onNavigateToHelp
}: SettingsPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "users" | "notifications">("general");
  
  // General settings state
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("europe-berlin");
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy");
  const [theme, setTheme] = useState(false); // false = Light, true = Dark
  const [brand, setBrand] = useState("campari");
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [outletUpdates, setOutletUpdates] = useState(true);
  const [serviceStatus, setServiceStatus] = useState(true);
  const [calculationResults, setCalculationResults] = useState(false);
  const [performanceReports, setPerformanceReports] = useState(true);
  const [deliveryFrequency, setDeliveryFrequency] = useState("immediate");

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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

            {/* Settings Container */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 px-6 pt-6">
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={`pb-4 border-b-2 transition-colors ${
                      activeTab === "general"
                        ? "border-[#FDD42B] text-gray-900 font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`pb-4 border-b-2 transition-colors ${
                      activeTab === "users"
                        ? "border-[#FDD42B] text-gray-900 font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Users & Roles
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`pb-4 border-b-2 transition-colors ${
                      activeTab === "notifications"
                        ? "border-[#FDD42B] text-gray-900 font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Notifications
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* General Settings Tab */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h3>
                      
                      <div className="space-y-6">
                        {/* Language Selector */}
                        <div>
                          <Label className="text-gray-900 mb-2 block">Language</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="border border-gray-300 rounded-md h-10 max-w-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                              <SelectItem value="italian">Italian</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Time Zone Selector */}
                        <div>
                          <Label className="text-gray-900 mb-2 block">Time Zone</Label>
                          <Select value={timezone} onValueChange={setTimezone}>
                            <SelectTrigger className="border border-gray-300 rounded-md h-10 max-w-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="europe-berlin">Europe/Berlin</SelectItem>
                              <SelectItem value="europe-london">Europe/London</SelectItem>
                              <SelectItem value="america-new-york">America/New York</SelectItem>
                              <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Date & Number Format */}
                        <div>
                          <Label className="text-gray-900 mb-3 block">Date & Number Format</Label>
                          <RadioGroup value={dateFormat} onValueChange={setDateFormat}>
                            <div className="flex items-center space-x-2 mb-3">
                              <RadioGroupItem value="dd-mm-yyyy" id="dd-mm-yyyy" className="border border-gray-300" />
                              <Label htmlFor="dd-mm-yyyy" className="text-gray-700 cursor-pointer">DD/MM/YYYY</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mm-dd-yyyy" id="mm-dd-yyyy" className="border border-gray-300" />
                              <Label htmlFor="mm-dd-yyyy" className="text-gray-700 cursor-pointer">MM/DD/YYYY</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator className="bg-gray-200" />

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <Label className="text-gray-900 block mb-1">Theme</Label>
                            <p className="text-sm text-gray-600">Switch between light and dark mode</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Light</span>
                            <Switch
                              checked={theme}
                              onCheckedChange={setTheme}
                            />
                            <span className="text-sm text-gray-600">Dark</span>
                          </div>
                        </div>

                        <Separator className="bg-gray-200" />

                        {/* Brand / Campaign Association */}
                        <div>
                          <Label className="text-gray-900 mb-2 block">Brand / Campaign Association</Label>
                          <p className="text-sm text-gray-600 mb-3">Choose default brand for your campaigns</p>
                          <Select value={brand} onValueChange={setBrand}>
                            <SelectTrigger className="border border-gray-300 rounded-md h-10 max-w-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="campari">Campari</SelectItem>
                              <SelectItem value="aperol">Aperol</SelectItem>
                              <SelectItem value="sarti">Sarti</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-6 rounded-md"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-medium"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {/* Users & Roles Tab */}
                {activeTab === "users" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Users & Roles</h3>
                        <p className="text-gray-600 text-sm">Roles define user permissions across Outlets, Services, and Calculations.</p>
                      </div>
                      <Button
                        className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-5 rounded-[8px] shadow-sm font-medium flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        Add New User
                      </Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-gray-200">
                            <TableHead className="text-gray-700 font-medium">Name</TableHead>
                            <TableHead className="text-gray-700 font-medium">Email</TableHead>
                            <TableHead className="text-gray-700 font-medium">Role</TableHead>
                            <TableHead className="text-gray-700 font-medium">Status</TableHead>
                            <TableHead className="text-gray-700 font-medium text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="text-gray-900 font-medium">John Smith</TableCell>
                            <TableCell className="text-gray-600">john.smith@ccmhub.com</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                Admin
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Active
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="text-gray-900 font-medium">Sarah Johnson</TableCell>
                            <TableCell className="text-gray-600">sarah.j@ccmhub.com</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                Manager
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Active
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="text-gray-900 font-medium">Michael Brown</TableCell>
                            <TableCell className="text-gray-600">m.brown@ccmhub.com</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                Viewer
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                                Inactive
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell className="text-gray-900 font-medium">Emma Wilson</TableCell>
                            <TableCell className="text-gray-600">emma.w@ccmhub.com</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                Manager
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Active
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h3>
                      <p className="text-gray-600 text-sm mb-6">Configure how you want to receive alerts and updates</p>

                      {/* Notification Channels */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium mb-1">Email Notifications</p>
                            <p className="text-gray-600 text-sm">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium mb-1">In-app Notifications</p>
                            <p className="text-gray-600 text-sm">Show notifications within the application</p>
                          </div>
                          <Switch
                            checked={inAppNotifications}
                            onCheckedChange={setInAppNotifications}
                          />
                        </div>
                      </div>

                      <Separator className="bg-gray-200 my-6" />

                      {/* Notification Categories */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-4">Notification Categories</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="outlet-updates"
                              checked={outletUpdates}
                              onCheckedChange={(checked) => setOutletUpdates(checked as boolean)}
                              className="border border-gray-300"
                            />
                            <Label htmlFor="outlet-updates" className="text-gray-700 cursor-pointer">
                              Outlet updates
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="service-status"
                              checked={serviceStatus}
                              onCheckedChange={(checked) => setServiceStatus(checked as boolean)}
                              className="border border-gray-300"
                            />
                            <Label htmlFor="service-status" className="text-gray-700 cursor-pointer">
                              Service status changes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="calculation-results"
                              checked={calculationResults}
                              onCheckedChange={(checked) => setCalculationResults(checked as boolean)}
                              className="border border-gray-300"
                            />
                            <Label htmlFor="calculation-results" className="text-gray-700 cursor-pointer">
                              Calculation results
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="performance-reports"
                              checked={performanceReports}
                              onCheckedChange={(checked) => setPerformanceReports(checked as boolean)}
                              className="border border-gray-300"
                            />
                            <Label htmlFor="performance-reports" className="text-gray-700 cursor-pointer">
                              Performance reports
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-gray-200 my-6" />

                      {/* Delivery Frequency */}
                      <div className="mb-6">
                        <Label className="text-gray-900 mb-3 block">Delivery Frequency</Label>
                        <Select value={deliveryFrequency} onValueChange={setDeliveryFrequency}>
                          <SelectTrigger className="border border-gray-300 rounded-md h-10 max-w-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="daily">Daily summary</SelectItem>
                            <SelectItem value="weekly">Weekly summary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator className="bg-gray-200 my-6" />

                      {/* Preview Area */}
                      <div>
                        <Label className="text-gray-900 mb-3 block">Notification Preview</Label>
                        <div className="border border-gray-200 bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[120px]">
                          <p className="text-gray-500 text-center">Example notification preview will appear here.</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-6 rounded-md"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-medium"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
