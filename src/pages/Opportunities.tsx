import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import { 
  Search,
  Filter,
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Users,
  TrendingUp,
  Bookmark,
  Share2
} from "lucide-react";

const mockUser = {
  name: "Rahul Kumar",
  email: "rahul.kumar@nitp.ac.in",
  role: 'contributor' as const,
  badge: "Top Contributor"
};

const opportunities = [
  {
    id: "1",
    title: "Google Summer of Code 2024",
    description: "Work with open source organizations on 12-week programming projects during summer. Stipend: $3000-$6600.",
    company: "Google",
    type: "Internship",
    location: "Remote",
    deadline: "2024-02-15",
    postedBy: {
      name: "Amit Singh",
      role: "admin",
      avatar: ""
    },
    tags: ["open-source", "programming", "remote"],
    applicants: 45,
    isBookmarked: true,
    postedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: "2",
    title: "Microsoft Internship Program",
    description: "12-week internship program for software engineering roles. Work on real products used by millions.",
    company: "Microsoft",
    type: "Internship",
    location: "Hyderabad, India",
    deadline: "2024-03-01",
    postedBy: {
      name: "Priya Sharma",
      role: "contributor",
      avatar: ""
    },
    tags: ["software", "engineering", "product"],
    applicants: 127,
    isBookmarked: false,
    postedAt: "2024-01-19T15:45:00Z"
  },
  {
    id: "3",
    title: "HackerEarth Collegiate Cup",
    description: "National level programming contest for college students. Prize pool: ₹2,00,000. Team participation allowed.",
    company: "HackerEarth",
    type: "Competition",
    location: "Online",
    deadline: "2024-02-28",
    postedBy: {
      name: "Vikash Raj",
      role: "contributor",
      avatar: ""
    },
    tags: ["programming", "contest", "team"],
    applicants: 89,
    isBookmarked: true,
    postedAt: "2024-01-18T20:15:00Z"
  },
  {
    id: "4",
    title: "Flipkart Software Developer Hiring",
    description: "Full-time software developer positions for 2024 graduates. Competitive compensation package.",
    company: "Flipkart",
    type: "Full-time",
    location: "Bangalore, India",
    deadline: "2024-02-20",
    postedBy: {
      name: "Sneha Gupta",
      role: "user",
      avatar: ""
    },
    tags: ["full-time", "software", "fresher"],
    applicants: 203,
    isBookmarked: false,
    postedAt: "2024-01-17T09:20:00Z"
  },
  {
    id: "5",
    title: "Y Combinator Startup School",
    description: "Free 10-week online course for founders. Learn how to build and grow a startup from YC partners.",
    company: "Y Combinator",
    type: "Course",
    location: "Online",
    deadline: "2024-02-10",
    postedBy: {
      name: "Amit Singh",
      role: "admin",
      avatar: ""
    },
    tags: ["startup", "entrepreneurship", "free"],
    applicants: 67,
    isBookmarked: false,
    postedAt: "2024-01-16T14:30:00Z"
  }
];

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>(
    opportunities.filter(opp => opp.isBookmarked).map(opp => opp.id)
  );

  const types = ["all", "internship", "full-time", "competition", "course"];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || opp.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBookmark = (id: string) => {
    setBookmarkedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 0) return "Deadline passed";
    if (diffInDays === 1) return "Due tomorrow";
    if (diffInDays <= 7) return `${diffInDays} days left`;
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Internship': 'bg-primary text-primary-foreground',
      'Full-time': 'bg-success text-success-foreground',
      'Competition': 'bg-accent text-accent-foreground',
      'Course': 'bg-secondary text-secondary-foreground',
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
              <p className="text-muted-foreground">Discover internships, jobs, competitions, and more</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{opportunities.length}</p>
                    <p className="text-xs text-muted-foreground">Active Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {opportunities.reduce((sum, opp) => sum + opp.applicants, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{bookmarkedItems.length}</p>
                    <p className="text-xs text-muted-foreground">Bookmarked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search opportunities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {types.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(opportunity.type)}>
                          {opportunity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDeadline(opportunity.deadline)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {opportunity.title}
                      </h3>
                      <p className="text-sm font-medium text-primary">{opportunity.company}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleBookmark(opportunity.id)}
                      className={`h-8 w-8 ${
                        bookmarkedItems.includes(opportunity.id)
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Bookmark size={16} className={bookmarkedItems.includes(opportunity.id) ? 'fill-current' : ''} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {opportunity.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{opportunity.applicants} applied</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{formatDeadline(opportunity.deadline)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {opportunity.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                            {opportunity.postedBy.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          Posted by {opportunity.postedBy.name}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 size={14} />
                        </Button>
                        <Button variant="accent" size="sm">
                          <ExternalLink size={14} />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-muted-foreground space-y-2">
                  <p className="text-lg font-medium">No opportunities found</p>
                  <p>Try adjusting your search or filters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;