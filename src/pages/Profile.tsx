import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  Edit, 
  Mail, 
  Calendar,
  Award,
  TrendingUp,
  MessageSquare,
  Heart,
  BookOpen,
  Star,
  Trophy,
  Users
} from "lucide-react";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: 'admin' | 'contributor' | 'user';
    avatar?: string;
    badge?: string;
  };
}

const Profile = ({ user }: ProfileProps) => {
  const profileStats = {
    posts: 12,
    comments: 45,
    likes: 156,
    followers: 89,
    following: 67,
    reputation: 420
  };

  const badges = [
    { name: "Top Contributor", icon: Trophy, color: "bg-accent text-accent-foreground", earned: true },
    { name: "Mentor", icon: Users, color: "bg-primary text-primary-foreground", earned: true },
    { name: "Early Adopter", icon: Star, color: "bg-success text-success-foreground", earned: true },
    { name: "Helpful", icon: Heart, color: "bg-destructive text-destructive-foreground", earned: false },
    { name: "Scholar", icon: BookOpen, color: "bg-muted text-muted-foreground", earned: false },
    { name: "Influencer", icon: TrendingUp, color: "bg-secondary text-secondary-foreground", earned: false },
  ];

  const recentActivity = [
    { type: "post", title: "Shared insights on Machine Learning trends", time: "2 hours ago" },
    { type: "comment", title: "Commented on 'React Best Practices'", time: "5 hours ago" },
    { type: "like", title: "Liked 'Web Development Resources'", time: "1 day ago" },
    { type: "badge", title: "Earned 'Top Contributor' badge", time: "2 days ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post": return <MessageSquare size={16} className="text-primary" />;
      case "comment": return <MessageSquare size={16} className="text-accent" />;
      case "like": return <Heart size={16} className="text-destructive" />;
      case "badge": return <Award size={16} className="text-success" />;
      default: return <TrendingUp size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                    <div className="flex items-center justify-center space-x-2">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Joined January 2024</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                    {user.badge && (
                      <Badge variant="outline">{user.badge}</Badge>
                    )}
                  </div>

                  <Button variant="outline" className="w-full">
                    <Edit size={16} />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileStats.posts}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{profileStats.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{profileStats.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{profileStats.reputation}</div>
                    <div className="text-xs text-muted-foreground">Reputation</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Level</span>
                    <span className="text-foreground font-medium">420/500</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Badges & Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.name}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          badge.earned 
                            ? `${badge.color} shadow-sm hover:shadow-md cursor-pointer` 
                            : 'bg-muted/20 border-muted text-muted-foreground opacity-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <Icon size={24} />
                          <span className="text-xs font-medium">{badge.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contribution Graph */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Contribution Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 91 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        Math.random() > 0.7 
                          ? 'bg-primary' 
                          : Math.random() > 0.4 
                          ? 'bg-primary/60' 
                          : Math.random() > 0.2 
                          ? 'bg-primary/30' 
                          : 'bg-muted'
                      }`}
                      title={`${Math.floor(Math.random() * 5)} contributions`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-muted rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/30 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/60 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary rounded-sm"></div>
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;