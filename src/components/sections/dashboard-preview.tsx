"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Settings,
  Database,
  MessageSquare,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export function DashboardPreview() {
  const stats = [
    {
      label: "Total Conversations",
      value: "12,847",
      change: "+23%",
      icon: MessageSquare,
    },
    { label: "Active Users", value: "3,421", change: "+12%", icon: Users },
    { label: "Response Time", value: "1.2s", change: "-15%", icon: Clock },
    {
      label: "Satisfaction Rate",
      value: "96%",
      change: "+5%",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Comprehensive Admin Dashboard
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Complete control over your chat experience with our intuitive
              admin interface
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          {/* Stats Overview */}
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <div className="flex items-center justify-center mb-6">
                <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12 p-1 bg-muted/50 backdrop-blur-sm">
                  <TabsTrigger
                    value="overview"
                    className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="widget"
                    className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Widget</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai"
                    className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Models</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="kb"
                    className="h-10 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <Database className="h-4 w-4" />
                    <span className="hidden sm:inline">Knowledge</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>
                      Real-time insights into your chat performance and user
                      engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg bg-muted/10 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Interactive charts and real-time metrics
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="widget" className="space-y-4">
                <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Widget Customization</CardTitle>
                    <CardDescription>
                      Customize appearance, behavior, and branding of your chat
                      widget
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg bg-muted/10 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Visual customization tools and live preview
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>AI Model Configuration</CardTitle>
                    <CardDescription>
                      Configure AI providers, models, and response parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg bg-muted/10 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          AI model selection and parameter tuning
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kb" className="space-y-4">
                <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Knowledge Base Management</CardTitle>
                    <CardDescription>
                      Upload documents and train your AI on your specific
                      content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg bg-muted/10 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <Database className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Document management and AI training tools
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="text-base px-8">
              Explore Admin Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
