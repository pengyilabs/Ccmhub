import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ArrowLeft, Mail, Check } from "lucide-react";

interface VerificationPageProps {
  email: string;
  onVerificationSuccess: () => void;
  onBackToRegistration: () => void;
}

export function VerificationPage({ email, onVerificationSuccess, onBackToRegistration }: VerificationPageProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verification code submitted:", code);
    // Handle verification logic here
    if (code.length === 6) {
      onVerificationSuccess();
    }
  };

  const handleResendCode = () => {
    console.log("Resending verification code to:", email);
    // Handle resend logic here
  };

  return (
    <div className="h-[1024px] w-[1440px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[520px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#FDD42B] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CCM HUB</h1>
          </div>
          
          {/* Email Icon */}
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Verify your email</h2>
          <p className="text-gray-600">
            We sent a verification code to
          </p>
          <p className="text-gray-900 font-medium">{email}</p>
        </div>

        {/* Verification Form */}
        <Card className="p-8 border border-gray-200 shadow-xl bg-white rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Input */}
            <div className="space-y-4">
              <label className="block text-gray-900 text-center font-medium">
                Enter verification code
              </label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={code} 
                  onChange={setCode}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot 
                      index={0} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="w-12 h-14 border border-gray-300 text-gray-900 bg-white rounded-lg text-xl font-semibold focus:border-[#FDD42B] focus:ring-2 focus:ring-[#FDD42B]"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 h-11 rounded-full shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={code.length !== 6}
            >
              {code.length === 6 ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Verify email
                </>
              ) : (
                "Verify email"
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center pt-2">
              <p className="text-gray-600 mb-2 text-sm">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-gray-900 font-medium hover:underline text-sm"
              >
                Resend code
              </button>
            </div>
          </form>
        </Card>

        {/* Back Link */}
        <div className="mt-6">
          <button
            onClick={onBackToRegistration}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to registration
          </button>
        </div>
      </div>
    </div>
  );
}
