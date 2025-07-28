import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import heroBanner from "@/assets/hero-banner.jpg";
import { 
  Users, 
  Calendar,
  BookOpen,
  Trophy,
  TrendingUp,
  MessageCircle,
  Bell,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Code,
  Briefcase,
  Zap,
  Target,
  Globe,
  Plus,
  X,
  Link as LinkIcon,
  Tag
} from "lucide-react";

// Quick stats data
const communityStats = {
  totalMembers: 1247,
  activeToday: 89,
  postsThisWeek: 156,
  eventsThisMonth: 12
};

// Recent activities data
const recentActivities = [
  {
    id: 1,
    type: "post",
    user: "Priya Sharma",
    action: "created a new post about",
    content: "Hackathon Team Formation",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 2,
    type: "event",
    user: "Amit Singh",
    action: "registered for",
    content: "Google Summer of Code 2024",
    time: "4 hours ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 3,
    type: "achievement",
    user: "Vikash Raj",
    action: "completed",
    content: "Open Source Contribution Challenge",
    time: "6 hours ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
  }
];

// Upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "TechFest 2024 Hackathon",
    date: "March 15-17, 2024",
    time: "9:00 AM",
    location: "Main Auditorium",
    participants: 234,
    type: "Competition"
  },
  {
    id: 2,
    title: "Placement Drive - Amazon",
    date: "March 20, 2024",
    time: "10:00 AM",
    location: "Placement Cell",
    participants: 89,
    type: "Career"
  },
  {
    id: 3,
    title: "AI/ML Workshop",
    date: "March 25, 2024",
    time: "2:00 PM",
    location: "Computer Lab 1",
    participants: 156,
    type: "Workshop"
  }
];

// Featured opportunities
const featuredOpportunities = [
  {
    id: 1,
    title: "Google Summer of Code 2024",
    description: "Applications now open for GSoC 2024",
    deadline: "March 18, 2024",
    applicants: 45,
    difficulty: "Intermediate",
    type: "Internship"
  },
  {
    id: 2,
    title: "Microsoft Hackathon",
    description: "Build solutions for accessibility",
    deadline: "March 22, 2024",
    applicants: 78,
    difficulty: "Beginner",
    type: "Competition"
  },
  {
    id: 3,
    title: "Research Assistant Position",
    description: "AI Lab research opportunities",
    deadline: "March 30, 2024",
    applicants: 23,
    difficulty: "Advanced",
    type: "Research"
  }
];

const Home = () => {
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  
  // Create post form state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    type: "general",
    tags: [] as string[],
    applicationLink: "",
    deadline: "",
    location: ""
  });
  const [newTag, setNewTag] = useState("");

  const postCategories = ["General", "Academic", "Career", "Technical", "Social", "Events"];
  const postTypes = ["general", "opportunity", "event", "announcement", "help", "project"];
  const suggestedTags = ["internship", "placement", "hackathon", "research", "startup", "mentorship", "help", "project", "announcement", "event"];
  
  // Listen for mobile menu toggle events
  useEffect(() => {
    const handleMenuToggle = (event: CustomEvent) => {
      setIsMobileMenuOpen(event.detail.isOpen);
    };

    window.addEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    
    return () => {
      window.removeEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Competition": return Trophy;
      case "Career": return Briefcase;
      case "Workshop": return BookOpen;
      case "Internship": return Code;
      case "Research": return Globe;
      default: return Calendar;
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addSuggestedTag = (tag: string) => {
    if (!newPost.tags.includes(tag)) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.description.trim()) {
      alert("Please fill in at least the title and description.");
      return;
    }
    
    // Here you would typically send the post to your backend
    console.log("Creating post:", newPost);
    
    // Reset form
    setNewPost({
      title: "",
      description: "",
      content: "",
      category: "",
      type: "general",
      tags: [],
      applicationLink: "",
      deadline: "",
      location: ""
    });
    setIsCreatePostOpen(false);
    
    // Show success message (you could replace this with a toast)
    alert("Post created successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div 
        className={`transition-transform duration-300 ease-out md:transform-none ${
          isMobileMenuOpen ? 'transform translate-x-80' : 'transform translate-x-0'
        }`}
      >
        {/* Hero Section */}
        <div className="relative bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroBanner})` }}
          ></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center text-white space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                {getGreeting()}, {profile?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Welcome to <strong>NITP Tribe Connect</strong> - Your gateway to opportunities, 
                collaboration, and community growth at NIT Patna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild className="h-12 px-8 text-lg bg-white text-primary hover:bg-white/95 hover:scale-[1.02] hover:shadow-md transition-all duration-200 ease-in-out">
                  <Link to="/opportunities">
                    <Target className="mr-2" size={20} />
                    Explore Opportunities
                  </Link>
                </Button>
                <Button asChild className="h-12 px-8 text-lg bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-[1.02] hover:shadow-md transition-all duration-200 ease-in-out">
                  <Link to="/community">
                    <Users className="mr-2" size={20} />
                    Join Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">{communityStats.activeToday}</div>
                <div className="text-sm text-muted-foreground">Active Today</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{communityStats.postsThisWeek}</div>
                <div className="text-sm text-muted-foreground">Posts This Week</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">{communityStats.eventsThisMonth}</div>
                <div className="text-sm text-muted-foreground">Events This Month</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Featured Opportunities */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Opportunities */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Featured Opportunities
                  </CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/opportunities">
                      View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Deadline: {opportunity.deadline}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {opportunity.applicants} applicants
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline">{opportunity.type}</Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(opportunity.difficulty)}`}></div>
                            <span className="text-xs text-muted-foreground">{opportunity.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/events">
                      View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const TypeIcon = getTypeIcon(event.type);
                    return (
                      <div key={event.id} className="border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.participants} participants
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-accent" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={activity.avatar} alt={activity.user} />
                        <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.content}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/community">
                      View All Activities <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setIsCreatePostOpen(true)}
                    className="w-full justify-start"
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Create a Post
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/opportunities">
                      <Star className="mr-2 w-4 h-4" />
                      Browse Opportunities
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/leaderboard">
                      <Trophy className="mr-2 w-4 h-4" />
                      View Leaderboard
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/profile">
                      <Users className="mr-2 w-4 h-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Progress Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-success" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Community Engagement</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Skill Development</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/profile">
                      Complete Profile <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Create Post Dialog */}
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Post
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newPost.category} 
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {postCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your post..."
                  value={newPost.description}
                  onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>

              {/* Content with Markdown Support */}
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown Supported)</Label>
                <Textarea
                  id="content"
                  placeholder="Write your detailed content here... You can use markdown formatting like **bold**, *italic*, ### headers, etc."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  Supports markdown formatting: **bold**, *italic*, `code`, [links](url), lists, headers, etc.
                </p>
              </div>

              {/* Post Type and Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Post Type</Label>
                  <Select 
                    value={newPost.type} 
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select post type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="help">Help/Question</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(newPost.type === "opportunity" || newPost.type === "event") && (
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newPost.deadline}
                      onChange={(e) => setNewPost(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                )}
              </div>

              {/* Location and Application Link */}
              {(newPost.type === "opportunity" || newPost.type === "event") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Event location or 'Remote'"
                      value={newPost.location}
                      onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applicationLink">Application/Registration Link</Label>
                    <Input
                      id="applicationLink"
                      type="url"
                      placeholder="https://example.com/apply"
                      value={newPost.applicationLink}
                      onChange={(e) => setNewPost(prev => ({ ...prev, applicationLink: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddTag}>
                    <Tag className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {/* Selected Tags */}
                {newPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPost.tags.map((tag) => (
                      <Badge key={tag} className="flex items-center gap-1">
                        #{tag}
                        <X 
                          size={12} 
                          className="cursor-pointer hover:text-destructive" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Suggested Tags */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags
                      .filter(tag => !newPost.tags.includes(tag))
                      .map((tag) => (
                        <Badge 
                          key={tag} 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => addSuggestedTag(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  onClick={() => setIsCreatePostOpen(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.description.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Create Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;