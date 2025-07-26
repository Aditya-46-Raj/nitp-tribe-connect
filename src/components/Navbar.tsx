import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  User, 
  Users, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Trophy
} from "lucide-react";
import nitpLogo from "@/assets/nitp-tribe-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Dispatch custom event for layout components to listen to
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { 
      detail: { isOpen: newState } 
    }));
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { 
      detail: { isOpen: false } 
    }));
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home, roles: ['admin', 'contributor', 'user'] },
    { name: "Community", path: "/community", icon: Users, roles: ['admin', 'contributor', 'user'] },
    { name: "Opportunities", path: "/opportunities", icon: Calendar, roles: ['admin', 'contributor', 'user'] },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy, roles: ['admin', 'contributor', 'user'] },
    { name: "Admin", path: "/admin", icon: Settings, roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => 
    profile && item.roles.includes(profile.role)
  );

  const isActive = (path: string) => location.pathname === path;

  if (!profile) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
            onClick={closeMobileMenu}
          />
          
          {/* Slide-in Menu from Left */}
          <div className="absolute left-0 top-0 h-full w-80 bg-card border-r border-border shadow-xl transform transition-transform duration-300 ease-out overflow-y-auto">
            <div className="flex flex-col min-h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <img src={nitpLogo} alt="NITP Tribe" className="h-8 w-8" />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-foreground">NITP Tribe</span>
                    <span className="text-xs text-muted-foreground">Connect. Collaborate. Grow.</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="h-8 w-8"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* User Profile Section */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={profile.avatar_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&crop=face"} 
                      alt={profile.name} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {profile.batch}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="py-4">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground border-r-4 border-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Bottom Actions */}
              <div className="border-t border-border p-4 space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <button 
                  className="flex items-center space-x-3 px-2 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors w-full"
                  onClick={() => {
                    closeMobileMenu();
                    signOut();
                  }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src={nitpLogo} alt="NITP Tribe" className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">NITP Tribe</span>
              <span className="text-xs text-muted-foreground">Connect. Collaborate. Grow.</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer group flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                    {profile.name.split(' ')[0]}
                  </span>
                  <Avatar className="h-8 w-8 hover:ring-2 hover:ring-primary/20 transition-all duration-200">
                    <AvatarImage 
                      src={profile.avatar_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&crop=face"} 
                      alt={profile.name} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;