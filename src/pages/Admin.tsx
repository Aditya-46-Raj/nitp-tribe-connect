import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { 
  Users, 
  Award, 
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  UserCog,
  FileText
} from "lucide-react";

const mockUser = {
  name: "Admin User",
  email: "admin@nitp.ac.in",
  role: 'admin' as const,
  badge: "Administrator"
};

const mockUsers = [
  {
    id: "1",
    name: "Rahul Kumar",
    email: "rahul.kumar@nitp.ac.in",
    role: "contributor",
    batch: "2021",
    badges: ["Top Contributor"],
    joinedAt: "2024-01-15",
    lastActive: "2024-01-20"
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@nitp.ac.in",
    role: "user",
    batch: "2022",
    badges: ["AI Enthusiast"],
    joinedAt: "2024-01-10",
    lastActive: "2024-01-19"
  },
  {
    id: "3",
    name: "Vikash Raj",
    email: "vikash.raj@nitp.ac.in",
    role: "contributor",
    batch: "2020",
    badges: ["Open Source", "Mentor"],
    joinedAt: "2024-01-05",
    lastActive: "2024-01-18"
  }
];

const Admin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [opportunityTitle, setOpportunityTitle] = useState("");
  const [opportunityContent, setOpportunityContent] = useState("");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleAddBadge = (userId: string, badge: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { 
        ...user, 
        badges: [...user.badges, badge] 
      } : user
    ));
  };

  const handleCreateOpportunity = () => {
    // Mock opportunity creation
    console.log("Creating opportunity:", { opportunityTitle, opportunityContent });
    setOpportunityTitle("");
    setOpportunityContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span>Admin Panel</span>
              </h1>
              <p className="text-muted-foreground">Manage users, badges, and community content</p>
            </div>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <p className="text-xs text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Posts This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">89</p>
                    <p className="text-xs text-muted-foreground">Badges Awarded</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Opportunities Posted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Management */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCog className="h-5 w-5" />
                    <span>User Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Badges</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground text-sm">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={user.role} 
                                onValueChange={(value) => handleRoleChange(user.id, value)}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="contributor">Contributor</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.badges.map((badge) => (
                                  <Badge key={badge} variant="outline" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 size={14} />
                                </Button>
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

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Badge Assignment */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Badge Assignment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="user-select">Select User</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose user..." />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="badge-select">Select Badge</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose badge..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-contributor">Top Contributor</SelectItem>
                        <SelectItem value="mentor">Mentor</SelectItem>
                        <SelectItem value="helper">Helper</SelectItem>
                        <SelectItem value="innovator">Innovator</SelectItem>
                        <SelectItem value="leader">Leader</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="accent" className="w-full">
                    <Plus size={16} />
                    Assign Badge
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Opportunity */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Create Opportunity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="opportunity-title">Title</Label>
                    <Input
                      id="opportunity-title"
                      placeholder="Enter opportunity title..."
                      value={opportunityTitle}
                      onChange={(e) => setOpportunityTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="opportunity-content">Content</Label>
                    <Textarea
                      id="opportunity-content"
                      placeholder="Describe the opportunity..."
                      rows={4}
                      value={opportunityContent}
                      onChange={(e) => setOpportunityContent(e.target.value)}
                    />
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full" 
                    onClick={handleCreateOpportunity}
                    disabled={!opportunityTitle || !opportunityContent}
                  >
                    <Plus size={16} />
                    Create Opportunity
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

export default Admin;