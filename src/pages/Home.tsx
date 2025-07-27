import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  Globe
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
                  <Button asChild className="w-full justify-start">
                    <Link to="/community">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Create a Post
                    </Link>
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
      </div>
    </div>
  );
};

export default Home;