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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SearchIcon, LogoutIcon } from "./ActionIcons";
import { Home, Building2, Calculator, BarChart3, HelpCircle, Settings, MessageCircle, PlayCircle, BookOpen } from "lucide-react";
import { NotificationsPopover } from "./NotificationsPopover";

interface HelpPageProps {
  onLogout: () => void;
  onNavigateToOverview: () => void;
  onNavigateToOutlets: () => void;
  onNavigateToCalculations: () => void;
  onNavigateToPerformance: () => void;
  onNavigateToSettings: () => void;
}

export function HelpPage({ 
  onLogout, 
  onNavigateToOverview, 
  onNavigateToOutlets,
  onNavigateToCalculations,
  onNavigateToPerformance,
  onNavigateToSettings
}: HelpPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium">
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
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl text-gray-900 mb-2">Help Center</h1>
              <p className="text-gray-600">Find answers to common questions and learn how to use CCM HUB</p>
            </div>

            {/* Contact Support Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDD42B] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#FDD42B]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Need More Help?</h2>
                  <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help you.
                  </p>
                  <Button
                    className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 px-6 rounded-[8px] shadow-sm font-medium"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              </div>

              <div className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {/* Getting Started */}
                  <AccordionItem value="item-1" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How do I get started with CCM HUB?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Managing Outlets */}
                  <AccordionItem value="item-2" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How do I add a new outlet to my account?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Services */}
                  <AccordionItem value="item-3" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      What services are available for my outlets?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                      quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
                      deserunt mollitia animi, id est laborum et dolorum fuga.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Calculations */}
                  <AccordionItem value="item-4" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How do calculations work?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio 
                      cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
                      Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Performance Tracking */}
                  <AccordionItem value="item-5" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How can I track my outlet performance?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut 
                      perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Onboarding/Offboarding */}
                  <AccordionItem value="item-6" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      What is the difference between onboarding and offboarding?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
                      commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
                      vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                    </AccordionContent>
                  </AccordionItem>

                  {/* User Management */}
                  <AccordionItem value="item-7" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How do I manage team members and their roles?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
                      voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Reports */}
                  <AccordionItem value="item-8" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      Can I export performance reports?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Notifications */}
                  <AccordionItem value="item-9" className="border-b border-gray-200">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      How do I customize my notification preferences?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                      quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
                      deserunt mollitia animi, id est laborum et dolorum fuga.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Security */}
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                      Is my data secure on CCM HUB?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio 
                      cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
                      Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Resources</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <PlayCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Video Tutorials</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Watch step-by-step video guides to learn the platform
                  </p>
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 rounded-md"
                  >
                    Watch Videos
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Read detailed guides and technical documentation
                  </p>
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 rounded-md"
                  >
                    View Docs
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
