import { Button } from "./ui/button";
import { CloseIcon } from "./ActionIcons";

interface CalculationSavedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewDetails: () => void;
  calculationId?: string;
}

export function CalculationSavedModal({
  open,
  onOpenChange,
  onViewDetails,
  calculationId
}: CalculationSavedModalProps) {
  if (!open) return null;

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleViewDetails = () => {
    onViewDetails();
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white border border-gray-200 rounded-2xl w-[480px] max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Confirmation</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon/Checkmark */}
            <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mb-6">
              <span className="text-green-600 text-3xl font-bold">✓</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calculation saved successfully!</h3>

            {/* Subtext */}
            <p className="text-gray-600 mb-8">
              Your new calculation has been created and saved.
            </p>

            {/* Primary Button */}
            <Button
              onClick={handleViewDetails}
              className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 rounded-[8px] h-11 mb-3 shadow-lg font-semibold"
            >
              View Calculation Details
            </Button>

            {/* Secondary Link */}
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}