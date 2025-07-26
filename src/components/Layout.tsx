import { useState, useEffect } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen for mobile menu state changes
  useEffect(() => {
    const handleMenuToggle = (event: CustomEvent) => {
      setIsMobileMenuOpen(event.detail.isOpen);
    };

    window.addEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    
    return () => {
      window.removeEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div 
        className={`transition-transform duration-300 ease-out md:transform-none ${
          isMobileMenuOpen ? 'transform translate-x-80' : 'transform translate-x-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
