import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Mail, Shield, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import nitpLogo from "@/assets/nitp-tribe-logo.png";
import heroBanner from "@/assets/hero-banner.jpg";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("signin");
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateEmail = (email: string) => {
    return email.endsWith("@nitp.ac.in");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Access is restricted to @nitp.ac.in email addresses only.");
      return;
    }

    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Access is restricted to @nitp.ac.in email addresses only.");
      return;
    }

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(email, "", name);
    
    if (error) {
      setError(error.message);
    } else {
      setError("");
      alert("Check your email for a magic link to sign in!");
    }
    
    setIsLoading(false);
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

      {/* Auth Form */}
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
              <CardTitle className="text-2xl font-bold text-foreground">
                {activeTab === 'signin' ? 'Welcome Back' : 'Join NITP Tribe'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {activeTab === 'signin' 
                  ? 'Sign in with your NITP email to access the community'
                  : 'Create your account with NITP email to join the community'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
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
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium text-foreground">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                        NITP Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.name@nitp.ac.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password (min. 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center text-xs text-muted-foreground space-y-2 mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure access for NITP community only</span>
                </div>
                <p>
                  New to NITP? Contact your batch representative for access.
                </p>
              </div>
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

export default Auth;