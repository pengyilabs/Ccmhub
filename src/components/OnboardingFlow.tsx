import { useState, useRef, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Search, MapPin, Locate, Plus, Minus, Building2, BarChart3, TrendingUp, Calculator, Users, MousePointerClick, Percent } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlaceholderIcon } from "./PlaceholderIcon";
import outletImage from "figma:asset/a1af56cf3de9fbc999c145ec81ac1ac3b0e4f1aa.png";

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
  onOpenCreateOutlet: () => void;
}

export function OnboardingFlow({ onComplete, onSkip, onOpenCreateOutlet }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [outletCreated, setOutletCreated] = useState(false);
  const [showOutletForm, setShowOutletForm] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [location, setLocation] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedMapLocation, setSelectedMapLocation] = useState<{lat: number, lng: number} | null>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);

  // Mock location data
  const mockLocations = [
    "123 Main Street, New York, NY 10001",
    "456 Broadway, New York, NY 10013",
    "789 5th Avenue, New York, NY 10022",
    "321 Park Avenue, New York, NY 10010",
    "654 Madison Avenue, New York, NY 10022",
    "987 Lexington Avenue, New York, NY 10021",
    "147 Wall Street, New York, NY 10005",
    "258 Canal Street, New York, NY 10013",
    "369 Houston Street, New York, NY 10014",
    "741 Bleecker Street, New York, NY 10014",
  ];

  const filteredLocations = location.length > 0 
    ? mockLocations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowOutletForm(false);
      setFormSuccess(false);
    }
  };

  const handleBackInStep2 = () => {
    setShowOutletForm(false);
    setFormSuccess(false);
  };

  const handleCreateOutlet = () => {
    if (campaign && location) {
      setOutletCreated(true);
      setFormSuccess(true);
    }
  };

  const handleViewOutlets = () => {
    onComplete();
  };

  const handleCloseSuccess = () => {
    onSkip();
  };

  const handleAddFirstOutlet = () => {
    onOpenCreateOutlet();
  };

  const handleFinish = () => {
    onComplete();
  };

  const handleClose = () => {
    onSkip();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 w-[750px] shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {currentStep !== 1 && (
              <span className="text-sm text-gray-500 font-medium">Step {currentStep} of 6</span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-10 h-[500px] overflow-y-auto">
          {/* Step 1 - Welcome & Overview */}
          {currentStep === 1 && (
            <div className="text-center h-full flex flex-col justify-center">
              <div className="w-20 h-20 bg-[#FDD42B] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-gray-900 font-bold text-3xl">C</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Welcome to your CCM HUB</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Let's walk you through how everything works — outlets, services,
                and performance — so you can start managing your network
                efficiently.
              </p>
            </div>
          )}

          {/* Step 2 - Create your first Outlet */}
          {currentStep === 2 && (
            <div>
              {!formSuccess ? (
                <>
                  {!showOutletForm ? (
                    <div className="text-center">
                      {/* Outlet Preview Card */}
                      <div className="max-w-sm mx-auto mb-8">
                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
                          {/* Outlet Image */}
                          <div className="relative h-40 bg-gray-100">
                            <img 
                              src={outletImage} 
                              alt="Sample Outlet" 
                              className="w-full h-full object-cover"
                            />
                            {/* Campaign Badge */}
                            <div className="absolute top-3 right-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FDD42B] text-gray-900 shadow-sm">
                                Aperol Spritz
                              </span>
                            </div>
                          </div>
                          
                          {/* Outlet Info */}
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">Hans im Glück</h3>
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                  <span>Marienplatz, Munich</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-green-500" />
                              </div>
                            </div>
                            
                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                              <div className="text-center">
                                <p className="text-lg font-semibold text-gray-900">3</p>
                                <p className="text-xs text-gray-500">Services</p>
                              </div>
                              <div className="text-center border-l border-gray-100">
                                <p className="text-lg font-semibold text-gray-900">12</p>
                                <p className="text-xs text-gray-500">Reports</p>
                              </div>
                              <div className="text-center border-l border-gray-100">
                                <p className="text-lg font-semibold text-green-600">Active</p>
                                <p className="text-xs text-gray-500">Status</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Create your first Outlet</h2>
                      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Outlets represent your physical locations — restaurants or
                        bars. Each outlet can have its own services, calculations, and
                        performance metrics.
                      </p>

                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#FDD42B] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Building2 className="w-8 h-8 text-gray-900" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Create your first Outlet</h2>
                      </div>
                      <div className="space-y-4 max-w-lg mx-auto">
                        <div>
                          <Label htmlFor="campaign" className="text-gray-900 font-medium mb-2 block">
                            Campaign
                          </Label>
                          <Select value={campaign} onValueChange={setCampaign}>
                            <SelectTrigger className="border border-gray-300 rounded-lg h-11 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                              <SelectValue placeholder="Search and select campaign" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aperol-spritz-summer">Aperol Spritz Summer 2024</SelectItem>
                              <SelectItem value="campari-negroni">Campari Negroni Week</SelectItem>
                              <SelectItem value="skyy-launch">Skyy Vodka Launch</SelectItem>
                              <SelectItem value="wild-turkey-bourbon">Wild Turkey Bourbon Campaign</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-gray-900 font-medium mb-2 block">
                            Outlet Location
                          </Label>
                          <div ref={locationInputRef} className="relative">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input
                                id="location"
                                type="text"
                                placeholder="Search location or pin on map"
                                value={location}
                                onChange={(e) => {
                                  setLocation(e.target.value);
                                  setShowLocationDropdown(e.target.value.length > 0);
                                }}
                                onFocus={() => {
                                  if (location.length > 0) {
                                    setShowLocationDropdown(true);
                                  }
                                }}
                                className="border border-gray-300 rounded-lg h-11 pl-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            </div>
                            
                            {/* Location Dropdown */}
                            {showLocationDropdown && filteredLocations.length > 0 && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {filteredLocations.map((loc, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                      setLocation(loc);
                                      setShowLocationDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-2 border-b border-gray-100 last:border-b-0"
                                  >
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{loc}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Map Section */}
                          <div className="mt-5">
                            <Label className="text-gray-900 font-medium mb-2 block">
                              Or set location on the map
                            </Label>
                            <div 
                              className="w-full h-64 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
                              onClick={(e) => {
                                // Only pin if not clicking on controls
                                if ((e.target as HTMLElement).closest('.map-controls')) {
                                  return;
                                }
                                // Simulate map pin action
                                const randomLat = 40.7128 + (Math.random() - 0.5) * 0.1;
                                const randomLng = -74.0060 + (Math.random() - 0.5) * 0.1;
                                setSelectedMapLocation({ lat: randomLat, lng: randomLng });
                                setLocation(`${randomLat.toFixed(4)}, ${randomLng.toFixed(4)}`);
                              }}
                            >
                              {/* Simple map grid pattern */}
                              <div className="absolute inset-0 opacity-10">
                                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                                  {Array.from({ length: 64 }).map((_, i) => (
                                    <div key={i} className="border border-gray-300"></div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Map Controls */}
                              <div className="map-controls absolute top-3 left-3 flex flex-col gap-2 z-20">
                                {/* Current Location Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Simulate getting current location
                                    setSelectedMapLocation({ lat: 40.7128, lng: -74.0060 });
                                    setLocation("40.7128, -74.0060 (Current Location)");
                                  }}
                                  className="bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors shadow-sm"
                                  title="Use current location"
                                >
                                  <Locate className="w-5 h-5 text-gray-700" />
                                </button>
                              </div>

                              {/* Zoom Controls */}
                              <div className="map-controls absolute top-3 right-3 flex flex-col gap-1 z-20">
                                {/* Zoom In */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Simulate zoom in
                                  }}
                                  className="bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors shadow-sm"
                                  title="Zoom in"
                                >
                                  <Plus className="w-5 h-5 text-gray-700" />
                                </button>
                                
                                {/* Zoom Out */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Simulate zoom out
                                  }}
                                  className="bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors shadow-sm"
                                  title="Zoom out"
                                >
                                  <Minus className="w-5 h-5 text-gray-700" />
                                </button>
                              </div>
                              
                              {/* Map pin if location selected */}
                              {selectedMapLocation ? (
                                <MapPin className="w-8 h-8 text-red-500 relative z-10" />
                              ) : (
                                <div className="text-center relative z-10">
                                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-500">Click to pin location</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleCreateOutlet}
                          disabled={!campaign || !location}
                          className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 mt-4 rounded-full shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Create Outlet
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Success Screen */
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-green-50 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Congratulations!</h2>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    You have successfully added an outlet. You can now view your outlets page or continue exploring the platform.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={handleViewOutlets}
                      className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-11 px-8 rounded-lg"
                    >
                      View Outlets
                    </Button>
                    <Button
                      onClick={handleCloseSuccess}
                      className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-full shadow-lg font-semibold"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3 - Explore Services */}
          {currentStep === 3 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Explore Services</h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Each outlet can have multiple services linked to it.
                Services help you perform actions, manage processes, and analyze performance.
                Because services depend on outlets, they will only be available once you create at least one outlet.
              </p>
              
              {/* Service Cards */}
              <div className="grid grid-cols-2 gap-5 max-w-2xl mx-auto">
                {/* Service Card 1 */}
                <div className="border border-gray-200 bg-white rounded-xl text-left p-6 shadow-sm">
                  <h3 className="font-semibold mb-2 text-gray-900">Service A</h3>
                  <p className="text-sm text-gray-600 mb-5">
                    A short description of what this service allows you to do.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <div>
                      <Button
                        className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 mb-2 rounded-full shadow-sm font-semibold"
                      >
                        Action One
                      </Button>
                      <p className="text-xs text-gray-500">
                        Brief explanation of what happens when you select this option.
                      </p>
                    </div>
                    
                    <div>
                      <Button
                        className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 mb-2 rounded-full shadow-sm font-semibold"
                      >
                        Action Two
                      </Button>
                      <p className="text-xs text-gray-500">
                        Short description for this secondary option.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Card 2 */}
                <div className="border border-gray-200 bg-white rounded-xl text-left p-6 shadow-sm">
                  <h3 className="font-semibold mb-2 text-gray-900">Service B</h3>
                  <p className="text-sm text-gray-600 mb-5">
                    A short description of what this service allows you to do.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <div>
                      <Button
                        className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 mb-2 rounded-full shadow-sm font-semibold"
                      >
                        Action One
                      </Button>
                      <p className="text-xs text-gray-500">
                        Brief explanation of what happens when you select this option.
                      </p>
                    </div>
                    
                    <div>
                      <Button
                        className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-10 mb-2 rounded-full shadow-sm font-semibold"
                      >
                        Action Two
                      </Button>
                      <p className="text-xs text-gray-500">
                        Short description for this secondary option.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Step 4 - Performance & Calculations Overview */}
          {currentStep === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Calculations Overview</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Calculations help you plan stock and measure campaign results. You can create detailed calculations for each outlet with articles, quantities, and amounts.
              </p>

              {/* Calculation Modal Preview */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-xl mx-auto">
                  {/* Modal Header */}
                  <div className="border-b border-gray-200 px-3 py-2.5 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">New Calculation</h3>
                        <p className="text-xs text-gray-600">Create a new calculation for one of your outlets.</p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Content Preview */}
                  <div className="p-3 space-y-3">
                    {/* Outlet Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">
                        Select Outlet <span className="text-gray-600">*</span>
                      </label>
                      <div className="border border-gray-300 rounded-md px-2 py-1.5 bg-gray-50">
                        <span className="text-xs text-gray-600">Hans im Glück - Marienplatz</span>
                      </div>
                    </div>

                    {/* Articles Table Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-gray-900">
                          Articles <span className="text-gray-600">*</span>
                        </label>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-gray-300 h-6 text-xs rounded-md px-2"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Row
                        </Button>
                      </div>
                      <div className="border border-gray-200 rounded-md overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-900 text-xs">Article Name</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-900 text-xs w-14">Pieces</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-900 text-xs w-14">Boxes</th>
                              <th className="text-left px-2 py-1.5 font-medium text-gray-900 text-xs w-16">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="px-2 py-1.5 text-gray-700 text-xs">Aperol Spritz Wall Sign</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">12</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">3</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">€450</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="px-2 py-1.5 text-gray-700 text-xs">Aperol Pillow Set</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">24</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">6</td>
                              <td className="px-2 py-1.5 text-gray-700 text-xs">€280</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-2 py-1.5 font-medium text-gray-900 text-xs">Total</td>
                              <td className="px-2 py-1.5 font-medium text-gray-900 text-xs">36</td>
                              <td className="px-2 py-1.5 font-medium text-gray-900 text-xs">9</td>
                              <td className="px-2 py-1.5 font-medium text-gray-900 text-xs">€730</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="border-t border-gray-200 px-3 py-2.5 bg-gray-50 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 h-7 rounded-md text-xs px-3"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-7 rounded-full shadow-sm font-semibold text-xs px-4"
                    >
                      Save Calculation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Performance Overview */}
          {currentStep === 5 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Performance Overview</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Track your outlets' performance with detailed metrics. Monitor subscribers, redeemers, review clicks, and conversion ratios for each location.
              </p>

              {/* Performance Card Preview */}
              <div className="max-w-md mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Restaurant Rustikeria</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-sm text-gray-600">Subscribers</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">11</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="text-sm text-gray-600">Redeemers</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <MousePointerClick className="w-4 h-4 text-purple-500" />
                        </div>
                        <span className="text-sm text-gray-600">Review Clicks</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">24</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FDD42B] bg-opacity-10 rounded-lg flex items-center justify-center">
                          <Percent className="w-4 h-4 text-[#FDD42B]" />
                        </div>
                        <span className="text-sm text-gray-600">Conversion Ratio</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">72.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6 - Completion */}
          {currentStep === 6 && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-8 bg-green-50 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">You're ready to go!</h2>
              <p className="text-gray-600 mb-4 max-w-lg mx-auto">
                You can now explore the dashboard, add outlets, or activate
                services anytime.
              </p>
              <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto">
                Note: You can revisit this guide anytime from Help in your
                Dashboard.
              </p>
              <div className="flex gap-4 justify-center">
                {!outletCreated && (
                  <Button
                    variant="outline"
                    onClick={handleAddFirstOutlet}
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-11 px-8 rounded-lg"
                  >
                    Add First Outlet
                  </Button>
                )}
                <Button
                  onClick={handleFinish}
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-[8px] shadow-lg font-semibold"
                >
                  Go to Overview
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-200 flex items-center justify-between">
          {/* Step 1 Footer */}
          {currentStep === 1 && (
            <>
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-11 px-4"
              >
                Skip for now
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-[8px] shadow-lg font-semibold"
              >
                Start Guide
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          {/* Steps 2-5 Footer */}
          {currentStep > 1 && currentStep < 6 && !formSuccess && (
            <>
              <Button
                variant="ghost"
                onClick={handlePrevious}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-11 px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep < 6 && (
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="border border-gray-300 bg-[rgb(253,212,43)] hover:bg-gray-50 text-gray-700 h-11 px-6 rounded-lg"
                >
                  {currentStep === 5 ? "Finish onboarding" : "Next"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}