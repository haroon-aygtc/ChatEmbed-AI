"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Crown,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "agent" | "viewer";
  status: "active" | "inactive" | "pending";
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  permissions: string[];
}

const sampleTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@chatwidget.com",
    role: "admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    joinedAt: "2024-01-01T00:00:00Z",
    lastActive: "2024-01-15T14:30:00Z",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@chatwidget.com",
    role: "moderator",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    joinedAt: "2024-01-05T00:00:00Z",
    lastActive: "2024-01-15T12:15:00Z",
    permissions: [
      "manage_conversations",
      "view_analytics",
      "manage_knowledge_base",
    ],
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@chatwidget.com",
    role: "agent",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    joinedAt: "2024-01-10T00:00:00Z",
    lastActive: "2024-01-15T16:45:00Z",
    permissions: ["manage_conversations", "view_analytics"],
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@chatwidget.com",
    role: "viewer",
    status: "pending",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    joinedAt: "2024-01-14T00:00:00Z",
    lastActive: "2024-01-14T10:00:00Z",
    permissions: ["view_analytics"],
  },
];

const roleConfig = {
  admin: {
    label: "Admin",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    icon: Crown,
    description: "Full system access",
  },
  moderator: {
    label: "Moderator",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    icon: Shield,
    description: "Manage content and users",
  },
  agent: {
    label: "Agent",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    icon: UserCheck,
    description: "Handle conversations",
  },
  viewer: {
    label: "Viewer",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
    icon: UserX,
    description: "View-only access",
  },
};

function TeamMemberCard({
  member,
  onEdit,
  onDelete,
}: {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}) {
  const roleInfo = roleConfig[member.role];
  const RoleIcon = roleInfo.icon;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={roleInfo.color}>
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {roleInfo.label}
                </Badge>
                <Badge
                  variant={member.status === "active" ? "default" : "secondary"}
                  className={cn(
                    member.status === "active" &&
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
                    member.status === "pending" &&
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
                    member.status === "inactive" &&
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
                  )}
                >
                  {member.status}
                </Badge>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(member)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Member
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(member.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date(member.joinedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Active</p>
              <p className="font-medium">
                {new Date(member.lastActive).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddMemberDialog({
  onAdd,
}: {
  onAdd: (member: Omit<TeamMember, "id">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "agent" as TeamMember["role"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      status: "pending",
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      permissions: [],
    });
    setFormData({ name: "", email: "", role: "agent" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Invite a new member to join your team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value as TeamMember["role"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{config.label}</span>
                          <span className="text-xs text-muted-foreground">
                            - {config.description}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RolePermissions() {
  const permissions = [
    {
      id: "manage_conversations",
      label: "Manage Conversations",
      description: "View and respond to chat sessions",
    },
    {
      id: "view_analytics",
      label: "View Analytics",
      description: "Access performance metrics and reports",
    },
    {
      id: "manage_knowledge_base",
      label: "Manage Knowledge Base",
      description: "Add and edit knowledge base articles",
    },
    {
      id: "configure_ai",
      label: "Configure AI",
      description: "Modify AI settings and prompts",
    },
    {
      id: "manage_widget",
      label: "Manage Widget",
      description: "Customize widget appearance and behavior",
    },
    {
      id: "manage_team",
      label: "Manage Team",
      description: "Add, edit, and remove team members",
    },
    {
      id: "system_settings",
      label: "System Settings",
      description: "Access system-wide configuration",
    },
  ];

  return (
    <div className="space-y-6">
      {Object.entries(roleConfig).map(([roleKey, roleInfo]) => {
        const Icon = roleInfo.icon;
        return (
          <Card key={roleKey}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <span>{roleInfo.label}</span>
                <Badge variant="secondary" className={roleInfo.color}>
                  {roleInfo.description}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {permissions.map((permission) => {
                  const hasPermission =
                    roleKey === "admin" ||
                    (roleKey === "moderator" &&
                      [
                        "manage_conversations",
                        "view_analytics",
                        "manage_knowledge_base",
                      ].includes(permission.id)) ||
                    (roleKey === "agent" &&
                      ["manage_conversations", "view_analytics"].includes(
                        permission.id,
                      )) ||
                    (roleKey === "viewer" &&
                      permission.id === "view_analytics");

                  return (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{permission.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                      <Badge variant={hasPermission ? "default" : "secondary"}>
                        {hasPermission ? "Allowed" : "Denied"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(sampleTeamMembers);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const handleAddMember = (newMember: Omit<TeamMember, "id">) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
    };
    setTeamMembers((prev) => [...prev, member]);
    toast({
      title: "Member Added",
      description: `Invitation sent to ${member.email}`,
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    toast({
      title: "Member Removed",
      description: "Team member has been removed successfully.",
    });
  };

  const activeMembers = teamMembers.filter((m) => m.status === "active").length;
  const pendingMembers = teamMembers.filter(
    (m) => m.status === "pending",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            <Users className="h-3 w-3 mr-1" />
            Team Management
          </Badge>
        </div>
        <AddMemberDialog onAdd={handleAddMember} />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{pendingMembers}</div>
            <p className="text-sm text-muted-foreground">Pending Invites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.role === "admin").length}
            </div>
            <p className="text-sm text-muted-foreground">Administrators</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {teamMembers
              .filter((m) => m.status === "active")
              .map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))}
          </div>
          {teamMembers.filter((m) => m.status === "active").length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No Active Members
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add team members to collaborate on your chat system
                </p>
                <AddMemberDialog onAdd={handleAddMember} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RolePermissions />
        </TabsContent>

        <TabsContent value="invites" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {teamMembers
              .filter((m) => m.status === "pending")
              .map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))}
          </div>
          {teamMembers.filter((m) => m.status === "pending").length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No Pending Invites
                </h3>
                <p className="text-muted-foreground">
                  All team invitations have been accepted or expired
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
