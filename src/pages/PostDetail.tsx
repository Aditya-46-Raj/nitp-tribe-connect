import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

// Import highlight.js styles
import "highlight.js/styles/github-dark.css";

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

// Mock data - in a real app, this would come from an API
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Seeking Team for Hackathon at IIT Delhi",
    content: `# Hackathon Team Formation

Looking for passionate developers to join our team for the upcoming **Smart India Hackathon** at IIT Delhi.

## About the Hackathon
- **Date**: March 15-17, 2024
- **Theme**: AI-powered solutions for sustainable agriculture
- **Prize Pool**: ₹10 Lakhs
- **Team Size**: 4-6 members

## What We're Building
We're developing an intelligent crop monitoring system that uses:

### Technologies
- **Frontend**: React.js with TypeScript
- **Backend**: Python FastAPI
- **ML/AI**: TensorFlow, OpenCV
- **Database**: PostgreSQL
- **Cloud**: AWS/Azure

### Key Features
1. **Real-time Crop Monitoring**
   - Drone-based image capture
   - Disease detection using computer vision
   - Growth stage analysis

2. **Smart Irrigation System**
   - Soil moisture sensors
   - Weather prediction integration
   - Automated watering schedules

3. **Market Price Prediction**
   - Historical data analysis
   - Demand forecasting
   - Price optimization

## Skills We Need
- **Frontend Developer**: React, TypeScript experience
- **Backend Developer**: Python, FastAPI knowledge
- **ML Engineer**: Computer Vision, TensorFlow
- **Hardware**: Arduino/Raspberry Pi experience

## What You'll Get
- ✅ Hands-on experience with cutting-edge technology
- ✅ Networking with industry experts
- ✅ Potential funding opportunities
- ✅ Certificate of participation
- ✅ Amazing memories and new friendships

## How to Join
If you're interested, please:
1. Comment below with your skills and experience
2. Share your GitHub profile
3. Mention your availability for the event

**Time is running out!** Registration closes on March 1st.

\`\`\`python
# Sample code for image processing
import cv2
import numpy as np

def detect_crop_disease(image_path):
    image = cv2.imread(image_path)
    # AI processing logic here
    return disease_prediction
\`\`\`

Feel free to reach out if you have any questions!`,
    author: {
      name: "Priya Sharma",
      email: "priya.sharma@nitp.ac.in",
      role: 'contributor' as const,
      badge: "AI Enthusiast"
    },
    tags: ["opportunity", "hackathon", "team", "ai", "agriculture"],
    createdAt: "2024-01-20T10:30:00Z",
    likes: 24,
    comments: 8,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "2",
    title: "Google Summer of Code Applications Open",
    content: `# Google Summer of Code 2024 🚀

Great news everyone! **GSoC 2024** applications are now open and I've compiled a comprehensive guide to help you succeed.

## Important Dates
| Event | Date |
|-------|------|
| Application Opens | February 1, 2024 |
| Application Deadline | March 18, 2024 |
| Results Announced | May 1, 2024 |
| Coding Period | May 27 - August 26 |

## Beginner-Friendly Organizations

### 1. **Mozilla**
- **Projects**: Firefox, Thunderbird, Developer Tools
- **Languages**: JavaScript, C++, Python
- **Difficulty**: Beginner to Intermediate

### 2. **Apache Software Foundation**
- **Projects**: Kafka, Spark, Airflow
- **Languages**: Java, Scala, Python
- **Difficulty**: Intermediate

### 3. **Django Software Foundation**
- **Projects**: Django Framework
- **Languages**: Python
- **Difficulty**: Beginner

## Tips for Success

### 📝 Writing a Strong Proposal
1. **Understand the project thoroughly**
2. **Engage with the community early**
3. **Make meaningful contributions**
4. **Timeline should be realistic**

### 💻 Technical Preparation
\`\`\`bash
# Example: Setting up development environment
git clone https://github.com/organization/project.git
cd project
./setup.sh
\`\`\`

### 🤝 Community Engagement
- Join IRC/Discord channels
- Participate in discussions
- Ask questions (but research first!)
- Submit small patches/bug fixes

## Resources
- [GSoC Student Guide](https://google.github.io/gsocguides/student/)
- [Organization List 2024](https://summerofcode.withgoogle.com/organizations)
- [My GSoC Experience Blog](https://example.com)

## Free Proposal Review Service 🎯
I'm offering **FREE proposal reviews** for NITP students! Just DM me with:
- Your draft proposal
- Target organization
- Specific questions

> **Note**: I was a GSoC participant in 2023 with the Apache Software Foundation and would love to help others succeed!

Best of luck to everyone applying! 🌟`,
    author: {
      name: "Amit Singh",
      email: "amit.singh@nitp.ac.in",
      role: 'admin' as const,
      badge: "Mentor"
    },
    tags: ["opportunity", "gsoc", "internship", "opensource"],
    createdAt: "2024-01-19T15:45:00Z",
    likes: 56,
    comments: 15,
    isLiked: true,
    isBookmarked: false
  }
];

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
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

  useEffect(() => {
    // Find the post by ID
    const foundPost = mockPosts.find(p => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    if (!post) return;
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1
    });
  };

  const handleBookmark = () => {
    if (!post) return;
    setPost({
      ...post,
      isBookmarked: !post.isBookmarked
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div 
          className={`transition-transform duration-300 ease-out md:transform-none ${
            isMobileMenuOpen ? 'transform translate-x-80' : 'transform translate-x-0'
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/')}>
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div 
        className={`transition-transform duration-300 ease-out md:transform-none ${
          isMobileMenuOpen ? 'transform translate-x-80' : 'transform translate-x-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Feed
          </Button>

          {/* Post Card */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              {/* Author Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={`https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&crop=face`} 
                      alt={post.author.name} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                      <Badge variant="secondary">{post.author.badge}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-foreground mt-4">{post.title}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              {/* Markdown Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-foreground">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground">{children}</ol>,
                    li: ({ children }) => <li className="text-foreground">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-foreground">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border-collapse border border-border">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-border px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <Separator className="my-6" />

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={post.isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className="flex items-center space-x-2"
                  >
                    <Heart size={16} className={post.isLiked ? "fill-current" : ""} />
                    <span>{post.likes}</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </Button>
                  
                  <Button
                    variant={post.isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={handleBookmark}
                  >
                    <Bookmark size={16} className={post.isBookmarked ? "fill-current" : ""} />
                  </Button>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Comments ({post.comments})</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Comments feature coming soon!</p>
                <p className="text-sm mt-2">We're working on implementing a comment system.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
