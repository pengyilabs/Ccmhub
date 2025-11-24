import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { EyeIcon, EyeOffIcon } from "./ActionIcons";
import { Mail } from "lucide-react";

interface RegistrationPageProps {
  onRegistrationSuccess: (userName: string, email: string) => void;
  onSwitchToLogin: () => void;
}

export function RegistrationPage({ onRegistrationSuccess, onSwitchToLogin }: RegistrationPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle registration logic here
    onRegistrationSuccess(formData.fullName, formData.email);
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
    // Handle Google OAuth logic here
    onRegistrationSuccess("User", "user@example.com");
  };

  const handleMicrosoftSignUp = () => {
    console.log("Sign up with Microsoft");
    // Handle Microsoft OAuth logic here
    onRegistrationSuccess("User", "user@example.com");
  };

  return (
    <div className="h-[1024px] w-[1440px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#FDD42B] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CCM HUB</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Create your account</h2>
          <p className="text-gray-600">
            Manage all your restaurant outlets and digital services
          </p>
        </div>

        {/* Registration Form */}
        <Card className="p-8 border border-gray-200 shadow-xl bg-white rounded-2xl">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 h-11 rounded-lg"
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 h-11 rounded-lg"
              onClick={handleMicrosoftSignUp}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                <path fill="#f35325" d="M0 0h11v11H0z"/>
                <path fill="#81bc06" d="M12 0h11v11H12z"/>
                <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                <path fill="#ffba08" d="M12 12h11v11H12z"/>
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator className="bg-gray-200" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-900 font-medium">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border border-gray-300 bg-white h-11 rounded-lg focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 border border-gray-300 bg-white h-11 rounded-lg focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min. 8 characters)"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border border-gray-300 bg-white h-11 rounded-lg focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FDD42B] hover:opacity-90 text-gray-900 mt-6 h-11 rounded-full shadow-lg font-semibold"
            >
              Create account
            </Button>
          </form>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-gray-900 font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
