import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  Plus, 
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Star,
  X
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    role: 'admin' | 'contributor' | 'user';
    badge: string;
  };
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Seeking Team for Hackathon at IIT Delhi",
    content: "Looking for passionate developers to join our team for the upcoming hackathon. We're building an AI-powered solution for sustainable agriculture. Skills needed: React, Python, ML basics.",
    author: {
      name: "Priya Sharma",
      email: "priya.sharma@nitp.ac.in",
      role: 'contributor' as const,
      badge: "AI Enthusiast"
    },
    tags: ["opportunity", "hackathon", "team"],
    createdAt: "2024-01-20T10:30:00Z",
    likes: 24,
    comments: 8,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "2",
    title: "Google Summer of Code Applications Open",
    content: "GSoC 2024 applications are now open! I've compiled a list of beginner-friendly organizations and projects. Happy to help anyone with proposal reviews and tips.",
    author: {
      name: "Amit Singh",
      email: "amit.singh@nitp.ac.in",
      role: 'admin' as const,
      badge: "Mentor"
    },
    tags: ["opportunity", "gsoc", "internship"],
    createdAt: "2024-01-19T15:45:00Z",
    likes: 56,
    comments: 15,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: "3",
    title: "Help with Data Structures Assignment",
    content: "Struggling with the tree traversal problem in DSA assignment. Can someone explain the approach for level-order traversal using queue? I understand the concept but implementation is confusing.",
    author: {
      name: "Sneha Gupta",
      email: "sneha.gupta@nitp.ac.in",
      role: 'user' as const,
      badge: "First Year"
    },
    tags: ["help", "dsa", "assignment"],
    createdAt: "2024-01-19T09:20:00Z",
    likes: 12,
    comments: 6,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "4",
    title: "Open Source Project: NITP Course Planner",
    content: "Started working on a course planning tool for NITP students. It will help track credits, prerequisites, and plan semesters efficiently. Looking for contributors! Tech stack: React, Node.js, MongoDB.",
    author: {
      name: "Vikash Raj",
      email: "vikash.raj@nitp.ac.in",
      role: 'contributor' as const,
      badge: "Open Source"
    },
    tags: ["project", "open-source", "nitp"],
    createdAt: "2024-01-18T20:15:00Z",
    likes: 35,
    comments: 12,
    isLiked: true,
    isBookmarked: true
  }
];

const Home = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState(mockPosts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Create post form state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");

  const tags = ["opportunity", "help", "project", "announcement"];
  const categories = ["General", "Academic", "Career", "Technical", "Social"];
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
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

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    const post = {
      id: `${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: profile?.name || "Anonymous User",
        email: profile?.email || "user@example.com",
        role: profile?.role || 'user' as const,
        badge: profile?.batch || "Student"
      },
      tags: newPost.tags,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false
    };

    setPosts(prev => [post, ...prev]);
    
    // Reset form
    setNewPost({
      title: "",
      content: "",
      category: "",
      tags: []
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Community Feed</h1>
                <p className="text-muted-foreground">Stay connected with your NITP community</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-fit">
                    <Plus size={16} />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newPost.category} 
                        onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="What would you like to share with the community?"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <Button type="button" onClick={handleAddTag}>
                          Add
                        </Button>
                      </div>
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
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        type="button" 
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPost.title.trim() || !newPost.content.trim()}
                      >
                        Create Post
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts, topics, or authors..."
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
                  <Button
                    variant={selectedTag === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                  >
                    All
                  </Button>
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {filteredPosts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="text-muted-foreground space-y-2">
                      <p className="text-lg font-medium">No posts found</p>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Active Members</span>
                    </div>
                    <span className="font-semibold text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} className="text-success" />
                      <span className="text-sm text-muted-foreground">Posts Today</span>
                    </div>
                    <span className="font-semibold text-foreground">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-accent" />
                      <span className="text-sm text-muted-foreground">Events This Week</span>
                    </div>
                    <span className="font-semibold text-foreground">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">#placement</Badge>
                  <Badge variant="secondary">#internship</Badge>
                  <Badge variant="secondary">#hackathon</Badge>
                  <Badge variant="secondary">#research</Badge>
                  <Badge variant="secondary">#startup</Badge>
                  <Badge variant="secondary">#mentorship</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: "Amit Singh", badge: "Mentor", points: 580 },
                    { name: "Priya Sharma", badge: "AI Enthusiast", points: 420 },
                    { name: "Vikash Raj", badge: "Open Source", points: 380 }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-accent text-accent-foreground' : 
                          index === 1 ? 'bg-muted text-muted-foreground' : 
                          'bg-success text-success-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">{contributor.badge}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-auto">
                        <Star size={12} className="text-accent" />
                        <span className="text-xs font-medium text-foreground">{contributor.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;