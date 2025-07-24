import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { 
  ArrowLeft,
  Save,
  Eye,
  Hash,
  FileText,
  Send
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Rahul Kumar",
  email: "rahul.kumar@nitp.ac.in",
  role: 'contributor' as const,
  badge: "Top Contributor"
};

const PostEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const availableTags = [
    { id: "opportunity", label: "Opportunity", color: "bg-success text-success-foreground" },
    { id: "help", label: "Help", color: "bg-accent text-accent-foreground" },
    { id: "project", label: "Project", color: "bg-primary text-primary-foreground" },
    { id: "announcement", label: "Announcement", color: "bg-destructive text-destructive-foreground" },
    { id: "discussion", label: "Discussion", color: "bg-secondary text-secondary-foreground" },
    { id: "resource", label: "Resource", color: "bg-muted text-muted-foreground" },
  ];

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    // Mock post creation
    console.log("Creating post:", { title, content, tags: selectedTags });
    navigate("/");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { title, content, tags: selectedTags });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
                <p className="text-muted-foreground">Share your thoughts with the NITP community</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye size={16} />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save size={16} />
                Save Draft
              </Button>
              <Button 
                variant="hero" 
                onClick={handleSubmit}
                disabled={!title || !content}
              >
                <Send size={16} />
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{isPreview ? "Preview" : "Content"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isPreview ? (
                    <>
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter a compelling title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="text-lg font-medium"
                        />
                      </div>

                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your post content here... You can use markdown formatting."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={15}
                          className="resize-none"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-foreground">{title || "Your Post Title"}</h2>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        {content ? (
                          <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                          <p className="text-muted-foreground italic">Your content will appear here...</p>
                        )}
                      </div>
                      {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                          {selectedTags.map(tagId => {
                            const tag = availableTags.find(t => t.id === tagId);
                            return tag ? (
                              <Badge key={tagId} className={tag.color}>
                                #{tag.label}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="h-5 w-5" />
                    <span>Tags</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Select relevant tags to help others discover your post
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => handleTagToggle(tag.id)}
                          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                            selectedTags.includes(tag.id)
                              ? `${tag.color} border-transparent shadow-sm`
                              : "bg-background border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">#{tag.label}</span>
                            {selectedTags.includes(tag.id) && (
                              <span className="text-xs">✓</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Publishing Options */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="nitp-only">NITP Community Only</SelectItem>
                        <SelectItem value="batch-only">Your Batch Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="general">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Use a clear, descriptive title</p>
                    <p>• Add relevant tags to increase visibility</p>
                    <p>• Be respectful and constructive</p>
                    <p>• Include details and context</p>
                    <p>• Proofread before publishing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;