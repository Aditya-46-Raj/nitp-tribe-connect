import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Target,
  Award,
  Crown,
  Flame
} from "lucide-react";

const mockUser = {
  name: "Rahul Kumar",
  email: "rahul.kumar@nitp.ac.in",
  role: 'contributor' as const,
  badge: "Top Contributor"
};

const leaderboardData = [
  {
    rank: 1,
    name: "Amit Singh",
    email: "amit.singh@nitp.ac.in",
    role: "admin",
    batch: "2020",
    points: 1250,
    badges: ["Mentor", "Top Contributor", "Community Leader"],
    posts: 45,
    comments: 120,
    helpfulVotes: 89,
    streak: 25,
    avatar: ""
  },
  {
    rank: 2,
    name: "Priya Sharma",
    email: "priya.sharma@nitp.ac.in",
    role: "contributor",
    batch: "2021",
    points: 890,
    badges: ["AI Enthusiast", "Helper"],
    posts: 32,
    comments: 87,
    helpfulVotes: 65,
    streak: 18,
    avatar: ""
  },
  {
    rank: 3,
    name: "Vikash Raj",
    email: "vikash.raj@nitp.ac.in",
    role: "contributor",
    batch: "2020",
    points: 720,
    badges: ["Open Source", "Mentor"],
    posts: 28,
    comments: 94,
    helpfulVotes: 52,
    streak: 12,
    avatar: ""
  },
  {
    rank: 4,
    name: "Rahul Kumar",
    email: "rahul.kumar@nitp.ac.in",
    role: "contributor",
    batch: "2021",
    points: 580,
    badges: ["Top Contributor"],
    posts: 22,
    comments: 68,
    helpfulVotes: 41,
    streak: 8,
    avatar: ""
  },
  {
    rank: 5,
    name: "Sneha Gupta",
    email: "sneha.gupta@nitp.ac.in",
    role: "user",
    batch: "2022",
    points: 420,
    badges: ["First Year", "Helpful"],
    posts: 15,
    comments: 45,
    helpfulVotes: 28,
    streak: 5,
    avatar: ""
  },
  {
    rank: 6,
    name: "Ankit Sharma",
    email: "ankit.sharma@nitp.ac.in",
    role: "user",
    batch: "2022",
    points: 350,
    badges: ["Rising Star"],
    posts: 12,
    comments: 38,
    helpfulVotes: 22,
    streak: 7,
    avatar: ""
  },
  {
    rank: 7,
    name: "Pooja Singh",
    email: "pooja.singh@nitp.ac.in",
    role: "user",
    batch: "2023",
    points: 280,
    badges: ["Active Member"],
    posts: 8,
    comments: 32,
    helpfulVotes: 18,
    streak: 3,
    avatar: ""
  }
];

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all-time");
  
  const periods = [
    { id: "all-time", label: "All Time" },
    { id: "this-month", label: "This Month" },
    { id: "this-week", label: "This Week" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-amber-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-accent" />
                <span>Community Leaderboard</span>
              </h1>
              <p className="text-muted-foreground">Celebrating our most active community members</p>
            </div>
            
            <div className="flex space-x-2">
              {periods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{leaderboardData.length}</p>
                    <p className="text-xs text-muted-foreground">Active Contributors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {leaderboardData.reduce((sum, user) => sum + user.points, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {leaderboardData.reduce((sum, user) => sum + user.posts, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Posts Created</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Flame className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.max(...leaderboardData.map(user => user.streak))}
                    </p>
                    <p className="text-xs text-muted-foreground">Longest Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top 3 Podium */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-accent" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topThree.map((user, index) => (
                  <div key={user.rank} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                    <div className={`relative p-6 rounded-lg ${getRankBadgeColor(user.rank)} mb-4`}>
                      <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className={`${user.rank === 1 ? 'h-16 w-16' : 'h-14 w-14'} ring-4 ring-white/20`}>
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">{user.name}</h3>
                          <p className="text-sm opacity-90">Batch {user.batch}</p>
                          <p className="text-xl font-bold mt-2">{user.points} pts</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-4 text-xs">
                        <span>{user.posts} posts</span>
                        <span>{user.comments} comments</span>
                        <span>{user.helpfulVotes} helpful</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {user.badges.slice(0, 2).map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard Table */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Full Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Posts</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>Badges</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user) => (
                      <TableRow key={user.rank} className={user.name === mockUser.name ? "bg-primary/5" : ""}>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {user.rank <= 3 ? getRankIcon(user.rank) : `#${user.rank}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">Batch {user.batch}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-foreground">{user.points}</span>
                            <Progress value={(user.points / 1500) * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-foreground">{user.posts}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-foreground">{user.comments}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Flame size={14} className="text-destructive" />
                            <span className="font-medium text-foreground">{user.streak}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.badges.slice(0, 2).map((badge) => (
                              <Badge key={badge} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                            {user.badges.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.badges.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;