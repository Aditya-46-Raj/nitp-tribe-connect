import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import PostEditor from "./pages/PostEditor";
import Opportunities from "./pages/Opportunities";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (email: string) => {
    // Mock user creation based on email
    const mockUser = {
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: email.includes('admin') ? 'admin' : email.includes('faculty') ? 'contributor' : 'user',
      avatar: "",
      badge: email.includes('admin') ? 'Admin' : 'Member'
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!user ? (
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/post/new" element={<PostEditor />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/community" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
