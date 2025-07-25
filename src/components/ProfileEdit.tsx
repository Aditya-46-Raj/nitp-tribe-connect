import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, Edit, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileEditProps {
  children: React.ReactNode;
}

const ProfileEdit = ({ children }: ProfileEditProps) => {
  const { profile, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
    avatar_url: profile?.avatar_url || "",
    batch: profile?.batch || ""
  });

  const handleOpenChange = (open: boolean) => {
    if (open && profile) {
      setFormData({
        name: profile.name,
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        batch: profile.batch || ""
      });
      setError("");
    }
    setIsOpen(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsLoading(true);
    
    const { error } = await updateProfile({
      name: formData.name.trim(),
      bio: formData.bio.trim() || null,
      avatar_url: formData.avatar_url.trim() || null,
      batch: formData.batch.trim() || null
    });
    
    if (error) {
      setError(error.message);
    } else {
      setIsOpen(false);
    }
    
    setIsLoading(false);
  };

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit size={20} />
            <span>Edit Profile</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch" className="text-sm font-medium">
              Batch/Year
            </Label>
            <Input
              id="batch"
              type="text"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              placeholder="e.g., 2020-2024, Alumni 2018"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url" className="text-sm font-medium">
              Avatar URL
            </Label>
            <Input
              id="avatar_url"
              type="url"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              placeholder="https://example.com/your-photo.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Provide a URL to your profile picture
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit" 
              variant="default" 
              className="flex-1" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEdit;