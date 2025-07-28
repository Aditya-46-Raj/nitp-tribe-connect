import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  MessageCircle,
  Search,
  Filter,
  TrendingUp,
  MessageSquare,
  Share,
  Plus,
  X,
  Tag,
  Clock,
  Eye,
  ThumbsUp,
  Flame
} from "lucide-react";

// Community posts data
const communityPosts = [
  {
    id: 1,
    title: "Looking for teammates for TechFest 2024 Hackathon",
    content: "Hey everyone! I'm forming a team for the upcoming TechFest hackathon. Looking for skilled developers in React/Node.js. The theme is sustainability and we already have some amazing ideas brewing! 🚀",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      year: "3rd Year",
      branch: "CSE"
    },
    timestamp: "2 hours ago",
    likes: 23,
    comments: 8,
    views: 156,
    tags: ["hackathon", "team", "react", "nodejs"],
    category: "Technical",
    type: "project"
  },
  {
    id: 2,
    title: "Google Summer of Code - Application Tips & Resources",
    content: "Just got selected for GSoC 2024! Sharing my experience and resources that helped me. Feel free to ask questions in the comments. Remember, it's never too early to start preparing! 📚",
    author: {
      name: "Amit Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      year: "4th Year",
      branch: "CSE"
    },
    timestamp: "5 hours ago",
    likes: 67,
    comments: 23,
    views: 342,
    tags: ["gsoc", "opensource", "mentorship", "career"],
    category: "Career",
    type: "general"
  },
  {
    id: 3,
    title: "Study Group for Advanced Algorithms - DSA Mastery",
    content: "Starting a study group for advanced DSA topics. We'll meet every weekend to solve complex problems and discuss optimal solutions. Perfect for placement prep! Join us if you're serious about improving your problem-solving skills.",
    author: {
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      year: "3rd Year", 
      branch: "IT"
    },
    timestamp: "1 day ago",
    likes: 41,
    comments: 15,
    views: 298,
    tags: ["dsa", "study-group", "placement", "algorithms"],
    category: "Academic",
    type: "help"
  },
  {
    id: 4,
    title: "Startup Idea: Campus Food Delivery App - Looking for Co-founder",
    content: "Working on a campus-specific food delivery app with unique features like mess menu integration, group ordering, and student discounts. Looking for someone passionate about entrepreneurship to join as co-founder. Let's build something amazing together! 🍕",
    author: {
      name: "Rahul Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      year: "4th Year",
      branch: "ECE"
    },
    timestamp: "2 days ago",
    likes: 89,
    comments: 31,
    views: 521,
    tags: ["startup", "co-founder", "app-development", "entrepreneurship"],
    category: "Project",
    type: "opportunity"
  },
  {
    id: 5,
    title: "Mental Health Awareness Week - Let's Talk",
    content: "It's okay to not be okay. This week let's focus on mental health awareness. Remember, seeking help is a sign of strength, not weakness. Our counseling center is always open. Take care of yourselves! 💚",
    author: {
      name: "Dr. Anjali Verma",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
      year: "Faculty",
      branch: "Counselor"
    },
    timestamp: "3 days ago",
    likes: 156,
    comments: 42,
    views: 782,
    tags: ["mental-health", "support", "awareness", "wellbeing"],
    category: "Social",
    type: "announcement"
  }
];

// Trending topics
const trendingTopics = [
  { name: "TechFest 2024", posts: 45, trend: "up" },
  { name: "Placement Drive", posts: 32, trend: "up" },
  { name: "GSoC", posts: 28, trend: "stable" },
  { name: "Hackathon", posts: 23, trend: "up" },
  { name: "Study Groups", posts: 19, trend: "down" },
  { name: "Internships", posts: 17, trend: "up" }
];

// Popular tags
const popularTags = [
  "placement", "hackathon", "internship", "gsoc", "study-group", 
  "project", "team", "startup", "mentorship", "career", 
  "dsa", "development", "research", "opensource"
];

const Community = () => {
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [posts, setPosts] = useState(communityPosts);
  
  // Create post form state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
    type: "general"
  });
  const [newTag, setNewTag] = useState("");

  const postCategories = ["General", "Academic", "Career", "Technical", "Social", "Project"];
  const suggestedTags = ["placement", "internship", "hackathon", "study-group", "project", "team", "mentorship", "career", "help"];
  
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

  // Filter posts based on active tab and search
  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === "all" || post.category.toLowerCase() === activeTab;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || post.type === selectedFilter;
    
    return matchesTab && matchesSearch && matchesFilter;
  });

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
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please fill in the title and content.");
      return;
    }
    
    const newPostData = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: profile?.name || "Anonymous",
        avatar: profile?.profileImage || "",
        year: "Unknown",
        branch: "Unknown"
      },
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      views: 0,
      tags: newPost.tags,
      category: newPost.category || "General",
      type: newPost.type
    };
    
    setPosts(prev => [newPostData, ...prev]);
    
    // Reset form
    setNewPost({
      title: "",
      content: "",
      category: "",
      tags: [],
      type: "general"
    });
    setIsCreatePostOpen(false);
    
    alert("Post created successfully!");
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const getTimeAgo = (timestamp: string) => {
    return timestamp;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down") return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <div className="w-3 h-3 rounded-full bg-gray-400"></div>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div 
        className={`transition-transform duration-300 ease-out md:transform-none ${
          isMobileMenuOpen ? 'transform translate-x-80' : 'transform translate-x-0'
        }`}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                NITP Community Hub
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect, collaborate, and grow together. Share your thoughts, find teammates, 
                seek help, and contribute to our vibrant community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Button 
                  onClick={() => setIsCreatePostOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Create Post
                </Button>
                <Button variant="outline">
                  <Users className="mr-2 w-4 h-4" />
                  Join Discussion
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Trending & Tags */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(topic.trend)}
                        <span className="text-sm font-medium">#{topic.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filter Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search posts, topics, or tags..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Posts</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="help">Help/Question</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="opportunity">Opportunity</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Category Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="career">Career</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="project">Project</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4 mt-6">
                  {filteredPosts.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                        <p className="text-muted-foreground">
                          {searchTerm 
                            ? `No posts match your search for "${searchTerm}"`
                            : "Be the first to create a post in this category!"
                          }
                        </p>
                        <Button 
                          onClick={() => setIsCreatePostOpen(true)}
                          className="mt-4"
                        >
                          Create First Post
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredPosts.map((post) => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          {/* Post Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {post.author.year} • {post.author.branch}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {getTimeAgo(post.timestamp)}
                                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                              </div>
                            </div>
                          </div>

                          {/* Post Content */}
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                          </div>

                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => setSearchTerm(tag)}
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Post Actions */}
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="flex items-center gap-6">
                              <button 
                                onClick={() => handleLike(post.id)}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{post.likes}</span>
                              </button>
                              <Link 
                                to={`/post/${post.id}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm">{post.comments}</span>
                              </Link>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">{post.views}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Create Post Dialog */}
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Community Post
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="What's on your mind?"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newPost.category} 
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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

                <div className="space-y-2">
                  <Label htmlFor="type">Post Type</Label>
                  <Select 
                    value={newPost.type} 
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Discussion</SelectItem>
                      <SelectItem value="help">Help/Question</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    Add
                  </Button>
                </div>
                
                {/* Selected Tags */}
                {newPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
                      .slice(0, 8)
                      .map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline"
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
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                >
                  Post to Community
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Community;
