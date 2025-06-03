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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Activity,
  Download,
  Calendar,
  Filter,
  RefreshCw,
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 text-xs mt-1">
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
              {changeType === "negative" && (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {change}
            </span>
            <span className="text-muted-foreground">from last period</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface ConversationData {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  messageCount: number;
  resolved: boolean;
  satisfaction?: number;
  topic: string;
}

const sampleConversations: ConversationData[] = [
  {
    id: "1",
    userId: "user_123",
    userName: "Sarah Johnson",
    startTime: "2024-01-15T10:30:00Z",
    endTime: "2024-01-15T10:45:00Z",
    messageCount: 12,
    resolved: true,
    satisfaction: 5,
    topic: "Order Status",
  },
  {
    id: "2",
    userId: "user_456",
    userName: "Mike Chen",
    startTime: "2024-01-15T11:15:00Z",
    endTime: "2024-01-15T11:32:00Z",
    messageCount: 8,
    resolved: true,
    satisfaction: 4,
    topic: "Product Information",
  },
  {
    id: "3",
    userId: "user_789",
    userName: "Emma Davis",
    startTime: "2024-01-15T14:20:00Z",
    endTime: "2024-01-15T14:28:00Z",
    messageCount: 6,
    resolved: false,
    topic: "Technical Support",
  },
];

function ConversationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <CardDescription>
          Latest chat sessions and their outcomes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {sampleConversations.map((conversation, index) => (
              <div key={conversation.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{conversation.userName}</span>
                      <Badge
                        variant={conversation.resolved ? "default" : "secondary"}
                        className={cn(
                          conversation.resolved
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        )}
                      >
                        {conversation.resolved ? "Resolved" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {conversation.topic} • {conversation.messageCount} messages
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(conversation.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {conversation.satisfaction && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">
                          {conversation.satisfaction}/5
                        </span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                i < conversation.satisfaction!
                                  ? "bg-yellow-400"
                                  : "bg-gray-200 dark:bg-gray-700"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(
                        (new Date(conversation.endTime || Date.now()).getTime() -
                          new Date(conversation.startTime).getTime()) /
                          60000
                      )}m duration
                    </p>
                  </div>
                </div>
                {index < sampleConversations.length - 1 && (
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

function TopicsBreakdown() {
  const topics = [
    { name: "Order Status", count: 145, percentage: 35 },
    { name: "Product Information", count: 98, percentage: 24 },
    { name: "Technical Support", count: 76, percentage: 18 },
    { name: "Billing", count: 52, percentage: 13 },
    { name: "General Inquiry", count: 41, percentage: 10 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Topics</CardTitle>
        <CardDescription>
          Most common conversation topics this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{topic.name}</span>
                <span className="text-muted-foreground">
                  {topic.count} ({topic.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${topic.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PerformanceMetrics() {
  const metrics = [
    {
      label: "Average Response Time",
      value: "1.2s",
      target: "< 2s",
      status: "good",
    },
    {
      label: "Resolution Rate",
      value: "94.2%",
      target: "> 90%",
      status: "good",
    },
    {
      label: "Customer Satisfaction",
      value: "4.6/5",
      target: "> 4.0",
      status: "good",
    },
    {
      label: "Escalation Rate",
      value: "5.8%",
      target: "< 10%",
      status: "good",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Key performance indicators for your chat system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{metric.label}</p>
                <p className="text-sm text-muted-foreground">
                  Target: {metric.target}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{metric.value}</p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  On Target
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsSection() {
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            <BarChart3 className="h-3 w-3 mr-1" />
            Analytics & Insights
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Conversations"
          value="2,847"
          change="+12.5%"
          changeType="positive"
          icon={<MessageSquare className="h-4 w-4" />}
          description="Chat sessions this period"
        />
        <MetricCard
          title="Active Users"
          value="1,234"
          change="+8.2%"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
          description="Unique visitors"
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
          description="Successfully resolved"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <TopicsBreakdown />
            <PerformanceMetrics />
          </div>

          {/* Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation Volume</CardTitle>
              <CardDescription>
                Daily conversation trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Integration with charting library needed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <ConversationsList />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceMetrics />
            
            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
                <CardDescription>
                  How quickly your AI responds to queries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm"> 1 second</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">1-2 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2-5 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">5 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '2%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">892</div>
                <p className="text-sm text-muted-foreground">Returning Users</p>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  +5.4% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">342</div>
                <p className="text-sm text-muted-foreground">New Users</p>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  +15.3% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                How users interact with your chat system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Session Duration</span>
                  <span className="text-sm">4m 32s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Messages per Session</span>
                  <span className="text-sm">8.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bounce Rate</span>
                  <span className="text-sm">12.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Return Rate</span>
                  <span className="text-sm">72.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
