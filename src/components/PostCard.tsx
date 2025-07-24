import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Clock,
  ThumbsUp,
  Bookmark
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    role: 'admin' | 'contributor' | 'user';
    avatar?: string;
    badge?: string;
  };
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

const PostCard = ({ post, onLike, onComment, onBookmark }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(post.id);
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'opportunity': 'bg-success text-success-foreground',
      'help': 'bg-accent text-accent-foreground',
      'project': 'bg-primary text-primary-foreground',
      'announcement': 'bg-destructive text-destructive-foreground',
    };
    return colors[tag as keyof typeof colors] || 'bg-secondary text-secondary-foreground';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-elevated transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-foreground text-sm">{post.author.name}</h4>
                <Badge 
                  variant={post.author.role === 'admin' ? 'default' : 'secondary'} 
                  className="text-xs px-2 py-0.5"
                >
                  {post.author.role}
                </Badge>
                {post.author.badge && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {post.author.badge}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>{formatTime(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-60 hover:opacity-100">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight">{post.title}</h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                className={`text-xs px-2 py-1 ${getTagColor(tag)}`}
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`h-8 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                <span className="ml-1 text-xs">{likesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment?.(post.id)}
                className="h-8 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle size={16} />
                <span className="ml-1 text-xs">{post.comments}</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className={`h-8 w-8 ${isBookmarked ? 'text-accent hover:text-accent-hover' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Share2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;