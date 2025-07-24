import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Shield } from "lucide-react";
import nitpLogo from "@/assets/nitp-tribe-logo.png";
import heroBanner from "@/assets/hero-banner.jpg";

interface LoginProps {
  onLogin?: (email: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate NITP email domain
    if (!email.endsWith("@nitp.ac.in")) {
      setError("Access is restricted to @nitp.ac.in email addresses only.");
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.(email);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="NITP Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img src={nitpLogo} alt="NITP Tribe" className="h-16 w-16" />
              <div>
                <h1 className="text-4xl font-bold">NITP Tribe</h1>
                <p className="text-xl opacity-90">Connect. Collaborate. Grow.</p>
              </div>
            </div>
            
            <div className="space-y-4 text-lg opacity-90">
              <p>🎓 Connect with fellow NIT Patna students and alumni</p>
              <p>🚀 Discover opportunities and collaborate on projects</p>
              <p>🏆 Share knowledge and build your reputation</p>
              <p>🌟 Access exclusive events and resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <img src={nitpLogo} alt="NITP Tribe" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground">NITP Tribe</h1>
            <p className="text-muted-foreground">Connect. Collaborate. Grow.</p>
          </div>

          <Card className="shadow-elevated border-border/50">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in with your NITP email to access the community
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    NITP Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@nitp.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background border-border focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-destructive/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure access for NITP community only</span>
                  </div>
                  <p>
                    New to NITP? Contact your batch representative for access.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">Active Members</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-xs text-muted-foreground">Weekly Opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;