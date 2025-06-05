"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "@/lib/api";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  Key,
  UserCheck,
  UserX,
  Search,
  Filter,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isSystem: boolean;
}


function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() =>
        toast({ title: "Error", description: "Failed to load users", variant: "destructive" })
      );
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      setIsCreateDialogOpen(false);
      toast({
        title: "User Created",
        description: `${newUser.name} has been created successfully.`,
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to create user", variant: "destructive" });
    }
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;
    try {
      const updated = await updateUser(selectedUser.id, userData);
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? updated : user,
      );
      setUsers(updatedUsers);
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: "User Updated",
        description: "User information has been updated successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update user", variant: "destructive" });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to delete user", variant: "destructive" });
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const newStatus = user.status === "active" ? "inactive" : "active";
    try {
      const updated = await updateUser(userId, { status: newStatus });
      setUsers(users.map((u) => (u.id === userId ? updated : u)));
      toast({
        title: "Status Updated",
        description: "User status has been updated successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Add User Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted/20 border border-border">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              User Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage users, roles, and permissions across your system
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with appropriate role and
                permissions.
              </DialogDescription>
            </DialogHeader>
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Filters */}
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {filteredUsers.length} results
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Users</SelectItem>
                <SelectItem value="inactive">Inactive Users</SelectItem>
                <SelectItem value="suspended">Suspended Users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="h-8 text-xs"
            >
              All ({users.length})
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
              className="h-8 text-xs"
            >
              Active ({users.filter((u) => u.status === "active").length})
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("inactive")}
              className="h-8 text-xs"
            >
              Inactive ({users.filter((u) => u.status === "inactive").length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Users Table */}
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Users ({filteredUsers.length})
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Manage user accounts, roles, and permissions across your system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {users.filter((u) => u.status === "active").length} Active
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {users.filter((u) => u.status === "inactive").length} Inactive
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-muted/30">
                  <TableHead className="font-semibold text-foreground">
                    User
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Role
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Last Login
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Created
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors duration-200"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground">
                            {user.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="outline"
                        className={`font-medium ${
                          user.role === "Admin"
                            ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                            : user.role === "Moderator"
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                              : "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                        }`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`${getStatusColor(user.status)} font-medium`}
                      >
                        <div className="flex items-center gap-1.5">
                          {user.status === "active" && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                          {user.status === "inactive" && (
                            <Clock className="h-3 w-3" />
                          )}
                          {user.status === "suspended" && (
                            <XCircle className="h-3 w-3" />
                          )}
                          {user.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString()
                            : "Never"}
                        </div>
                        {user.lastLogin && (
                          <div className="text-xs text-muted-foreground">
                            {new Date(user.lastLogin).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.floor(
                            (Date.now() - new Date(user.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days ago
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditDialogOpen(true);
                          }}
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`h-9 w-9 p-0 transition-colors duration-200 ${
                            user.status === "active"
                              ? "hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950 dark:hover:text-orange-400"
                              : "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400"
                          }`}
                        >
                          {user.status === "active" ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}?
                                This action cannot be undone and will remove all
                                associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete User
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm
              user={selectedUser}
              onSubmit={handleUpdateUser}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedUser(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UserForm({
  user,
  onSubmit,
  onCancel,
}: {
  user?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "User",
    status: user?.status || "active",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Moderator">Moderator</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {!user && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required={!user}
          />
        </div>
      )}
      {user && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                status: value as "active" | "inactive" | "suspended",
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{user ? "Update User" : "Create User"}</Button>
      </DialogFooter>
    </form>
  );
}

function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    getRoles()
      .then(setRoles)
      .catch(() =>
        toast({ title: "Error", description: "Failed to load roles", variant: "destructive" })
      );
  }, []);

  const handleCreateRole = async (roleData: Partial<Role>) => {
    try {
      const newRole = await createRole(roleData);
      setRoles([...roles, newRole]);
      setIsCreateDialogOpen(false);
      toast({
        title: "Role Created",
        description: `${newRole.name} role has been created successfully.`,
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to create role", variant: "destructive" });
    }
  };

  const handleUpdateRole = async (roleData: Partial<Role>) => {
    if (!selectedRole) return;
    try {
      const updated = await updateRole(selectedRole.id, roleData);
      setRoles(roles.map((r) => (r.id === selectedRole.id ? updated : r)));
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      toast({
        title: "Role Updated",
        description: "Role has been updated successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" });
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role?.isSystem) {
      toast({
        title: "Cannot Delete",
        description: "System roles cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    try {
      await deleteRole(roleId);
      setRoles(roles.filter((role) => role.id !== roleId));
      toast({
        title: "Role Deleted",
        description: "Role has been deleted successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to delete role", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted/20 border border-border">
            <Shield className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              Role Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage system roles and their permissions
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Create a new role with specific permissions.
              </DialogDescription>
            </DialogHeader>
            <RoleForm
              onSubmit={handleCreateRole}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => {
          const roleColorMap = {
            Admin:
              "from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200/50 dark:border-purple-800/50",
            Moderator:
              "from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200/50 dark:border-blue-800/50",
            User: "from-gray-50 to-gray-100/50 dark:from-gray-950/50 dark:to-gray-900/30 border-gray-200/50 dark:border-gray-800/50",
          };

          const iconColorMap = {
            Admin: "text-purple-600 dark:text-purple-400",
            Moderator: "text-blue-600 dark:text-blue-400",
            User: "text-gray-600 dark:text-gray-400",
          };

          return (
            <Card
              key={role.id}
              className="relative bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-card-foreground">
                    <div className="p-2 rounded-lg bg-muted/20 border border-border">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-bold">{role.name}</div>
                      {role.isSystem && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          System Role
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/10 border border-border">
                    <div className="text-2xl font-bold text-foreground">
                      {role.userCount}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Users
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/10 border border-border">
                    <div className="text-2xl font-bold text-foreground">
                      {role.permissions.length}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Permissions
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/30" />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created</span>
                  <span className="font-medium">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedRole(role);
                      setIsEditDialogOpen(true);
                    }}
                    className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!role.isSystem && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the {role.name}{" "}
                            role? This action cannot be undone and will affect
                            all users with this role.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteRole(role.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Role
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update role information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <RoleForm
              role={selectedRole}
              onSubmit={handleUpdateRole}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedRole(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoleForm({
  role,
  onSubmit,
  onCancel,
}: {
  role?: Role;
  onSubmit: (data: Partial<Role>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || [],
  });
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    getPermissions()
      .then(setPermissions)
      .catch(() =>
        toast({ title: "Error", description: "Failed to load permissions", variant: "destructive" })
      );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePermissionToggle = (permissionId: string) => {
    const updatedPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter((p) => p !== permissionId)
      : [...formData.permissions, permissionId];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const permissionsByCategory = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={role?.isSystem}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-4">
        <Label>Permissions</Label>
        <ScrollArea className="h-[300px] border border-border rounded-md p-4 bg-background">
          <div className="space-y-6">
            {Object.entries(permissionsByCategory).map(
              ([category, permissions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-sm text-foreground">
                    {category}
                  </h4>
                  <div className="space-y-2 pl-4">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(
                            permission.name,
                          )}
                          onCheckedChange={() =>
                            handlePermissionToggle(permission.name)
                          }
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-medium text-foreground"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </ScrollArea>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{role ? "Update Role" : "Create Role"}</Button>
      </DialogFooter>
    </form>
  );
}

function PermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    getPermissions()
      .then(setPermissions)
      .catch(() =>
        toast({ title: "Error", description: "Failed to load permissions", variant: "destructive" })
      );
  }, []);

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || permission.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(permissions.map((p) => p.category)));

  const handleCreatePermission = async (permissionData: Partial<Permission>) => {
    try {
      const newPermission = await createPermission(permissionData);
      setPermissions([...permissions, newPermission]);
      setIsCreateDialogOpen(false);
      toast({
        title: "Permission Created",
        description: `${newPermission.name} permission has been created successfully.`,
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to create permission", variant: "destructive" });
    }
  };

  const handleUpdatePermission = async (permissionData: Partial<Permission>) => {
    if (!selectedPermission) return;
    try {
      const updated = await updatePermission(selectedPermission.id, permissionData);
      setPermissions(
        permissions.map((p) => (p.id === selectedPermission.id ? updated : p)),
      );
      setIsEditDialogOpen(false);
      setSelectedPermission(null);
      toast({
        title: "Permission Updated",
        description: "Permission has been updated successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update permission", variant: "destructive" });
    }
  };

  const handleDeletePermission = async (permissionId: string) => {
    const permission = permissions.find((p) => p.id === permissionId);
    if (permission?.isSystem) {
      toast({
        title: "Cannot Delete",
        description: "System permissions cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    try {
      await deletePermission(permissionId);
      setPermissions(permissions.filter((permission) => permission.id !== permissionId));
      toast({
        title: "Permission Deleted",
        description: "Permission has been deleted successfully.",
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to delete permission", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted/20 border border-border">
            <Key className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              Permission Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage system permissions and access controls
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Permission</DialogTitle>
              <DialogDescription>
                Create a new permission for role assignment.
              </DialogDescription>
            </DialogHeader>
            <PermissionForm
              onSubmit={handleCreatePermission}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Table */}
      <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Permissions ({filteredPermissions.length})
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage system permissions and access controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {permission.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {permission.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {permission.isSystem ? (
                      <Badge variant="secondary">System</Badge>
                    ) : (
                      <Badge variant="outline">Custom</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPermission(permission);
                          setIsEditDialogOpen(true);
                        }}
                        disabled={permission.isSystem}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!permission.isSystem && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Permission
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the{" "}
                                {permission.name} permission? This action cannot
                                be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeletePermission(permission.id)
                                }
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Permission Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>
              Update permission information.
            </DialogDescription>
          </DialogHeader>
          {selectedPermission && (
            <PermissionForm
              permission={selectedPermission}
              onSubmit={handleUpdatePermission}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedPermission(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PermissionForm({
  permission,
  onSubmit,
  onCancel,
}: {
  permission?: Permission;
  onSubmit: (data: Partial<Permission>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: permission?.name || "",
    description: permission?.description || "",
    category: permission?.category || "Custom",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categories = [
    "User Management",
    "Role Management",
    "Chat",
    "System",
    "Custom",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Permission Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., user.read"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe what this permission allows"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
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
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {permission ? "Update Permission" : "Create Permission"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function UserManagementSection() {
  return (
    <div className="space-y-8 bg-background">
      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">
                    {users.length}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12%</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-full bg-muted/20">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle className="h-3 w-3" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-full bg-muted/20">
                <Activity className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Reviews
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.status === "inactive").length}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                    <Clock className="h-3 w-3" />
                    <span>Review</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-full bg-muted/20">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Admin Roles
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.role === "Admin").length}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                    <Shield className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-full bg-muted/20">
                <Shield className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-8">
        <div className="flex items-center justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-12 p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="users"
              className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Shield className="h-4 w-4 mr-2" />
              Roles
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Key className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
