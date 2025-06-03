"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  description?: string;
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  description,
}: MetricCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 text-xs">
            <span
              className={cn(
                "flex items-center",
                changeType === "positive" &&
                "text-green-600 dark:text-green-400",
                changeType === "negative" && "text-red-600 dark:text-red-400",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {changeType === "positive" && (
                <TrendingUp className="h-3 w-3 mr-1" />
              )}
              {change}
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface ActivityItem {
  id: string;
  type: "conversation" | "user" | "system";
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error";
  user?: {
    name: string;
    avatar?: string;
  };
}

const recentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "conversation",
    title: "New conversation started",
    description: "User asked about product pricing",
    timestamp: "2 minutes ago",
    status: "success",
    user: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  },
  {
    id: "2",
    type: "system",
    title: "AI model updated",
    description: "Gemini Pro model configuration updated",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: "3",
    type: "user",
    title: "New team member added",
    description: "John Doe joined as moderator",
    timestamp: "1 hour ago",
    status: "success",
    user: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  },
  {
    id: "4",
    type: "conversation",
    title: "High response time detected",
    description: "AI response took 8.5 seconds",
    timestamp: "2 hours ago",
    status: "warning",
  },
  {
    id: "5",
    type: "system",
    title: "Knowledge base updated",
    description: "3 new documents processed",
    timestamp: "3 hours ago",
    status: "success",
  },
];

function ActivityFeed() {
  const getActivityIcon = (
    type: ActivityItem["type"],
    status?: ActivityItem["status"],
  ) => {
    if (status === "error")
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (status === "warning")
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;

    switch (type) {
      case "conversation":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "user":
        return <Users className="h-4 w-4 text-green-500" />;
      case "system":
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Button variant="ghost" size="sm">
            View All
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
        <CardDescription>
          Latest system events and user interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(item.type, item.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    {item.user && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={item.user.avatar}
                            alt={item.user.name}
                          />
                          <AvatarFallback className="text-xs">
                            {item.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {item.user.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {index < recentActivity.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    {
      title: "Create Widget",
      description: "Set up a new chat widget",
      icon: <Plus className="h-5 w-5" />,
      href: "/admin?section=widget",
      variant: "default" as const,
    },
    {
      title: "Upload Documents",
      description: "Add to knowledge base",
      icon: <Plus className="h-5 w-5" />,
      href: "/admin?section=knowledge-base",
      variant: "outline" as const,
    },
    {
      title: "Configure AI",
      description: "Update AI settings",
      icon: <Zap className="h-5 w-5" />,
      href: "/admin?section=ai-config",
      variant: "outline" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="w-full justify-start h-auto p-4"
            asChild
          >
            <Link href={action.href}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{action.icon}</div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Conversations"
          value="2,847"
          change="+12.5%"
          changeType="positive"
          icon={<MessageSquare className="h-4 w-4" />}
          description="Active chat sessions"
        />
        <MetricCard
          title="Active Users"
          value="1,234"
          change="+8.2%"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
          description="Unique visitors today"
        />
        <MetricCard
          title="Avg Response Time"
          value="1.2s"
          change="-0.3s"
          changeType="positive"
          icon={<Clock className="h-4 w-4" />}
          description="AI response latency"
        />
        <MetricCard
          title="Resolution Rate"
          value="94.2%"
          change="+2.1%"
          changeType="positive"
          icon={<Activity className="h-4 w-4" />}
          description="Successfully resolved queries"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="space-y-6">
          <QuickActions />

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Models</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Knowledge Base</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Synced
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">WebSocket</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Degraded
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
