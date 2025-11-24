import { useState, useRef, useEffect } from "react";
import { X, Search, MapPin, Locate, Plus, Minus, Building2 } from "lucide-react";
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

interface CreateOutletModalProps {
  onClose: () => void;
  onSuccess: (outletData: { campaign: string; location: string }) => void;
}

export function CreateOutletModal({ onClose, onSuccess }: CreateOutletModalProps) {
  const [campaign, setCampaign] = useState("");
  const [location, setLocation] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedMapLocation, setSelectedMapLocation] = useState<{lat: number, lng: number} | null>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);

  // Mock location data
  const mockLocations = [
    "Hans im Glück, Munich",
    "Hans im Glück, Marienplatz, Munich",
    "Hans im Glück, Leopoldstraße, Munich",
    "Hans im Glück, Sendlinger Tor, Munich",
    "Hans im Glück, Isartor, Munich",
    "Hans im Glück, Schwabing, Munich",
    "Hans im Glück, Maxvorstadt, Munich",
    "Hans im Glück, Haidhausen, Munich",
  ];

  const filteredLocations = location.length > 0 
    ? mockLocations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateOutlet = () => {
    if (campaign && location) {
      setFormSuccess(true);
    }
  };

  const handleViewOutlets = () => {
    onSuccess({ campaign, location });
    handleClose();
  };

  const handleCloseSuccess = () => {
    onSuccess({ campaign, location });
    handleClose();
  };

  const handleClose = () => {
    setCampaign("");
    setLocation("");
    setSelectedMapLocation(null);
    setFormSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 w-[640px] shadow-2xl rounded-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FDD42B] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-900" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create your first Outlet</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 max-h-[600px] overflow-y-auto">
          {!formSuccess ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="modal-campaign" className="text-gray-900 font-medium mb-2 block">
                  Campaign
                </Label>
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger className="border border-gray-300 rounded-lg h-11 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                    <SelectValue placeholder="Search and select campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campari">Campari</SelectItem>
                    <SelectItem value="sarti">Sarti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="modal-location" className="text-gray-900 font-medium mb-2 block">
                  Outlet Location
                </Label>
                <div ref={locationInputRef} className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="modal-location"
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
            </div>
          ) : (
            /* Success Screen */
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-8 bg-green-50 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Congratulations!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
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
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 px-8 rounded-[8px] shadow-lg font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!formSuccess && (
          <div className="px-8 py-5 border-t border-gray-200">
            <Button
              onClick={handleCreateOutlet}
              disabled={!campaign || !location}
              className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 rounded-[8px] shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Outlet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
