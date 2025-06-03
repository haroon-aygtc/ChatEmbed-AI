"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BarChart3,
  Bell,
  Book,
  ChevronLeft,
  ChevronRight,
  Code,
  Cog,
  FileText,
  HelpCircle,
  Layout,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  Zap,
  Search,
  Command,
  Sparkles,
  Activity,
  Shield,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: Layout,
    badge: null,
    description: "Dashboard overview",
  },
  {
    title: "Widget Builder",
    href: "/admin/widget",
    icon: Palette,
    badge: "New",
    description: "Customize widget appearance",
  },
  {
    title: "AI Configuration",
    href: "/admin/ai-config",
    icon: Sparkles,
    badge: null,
    description: "Configure AI models",
  },
  {
    title: "Knowledge Base",
    href: "/admin/knowledge-base",
    icon: Book,
    badge: null,
    description: "Manage content library",
  },
  {
    title: "Prompt Flow",
    href: "/admin/prompt-flow",
    icon: FileText,
    badge: "Beta",
    description: "Design conversation flows",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    description: "Performance insights",
  },
  {
    title: "Team",
    href: "/admin/team",
    icon: Users,
    badge: null,
    description: "Manage team members",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
    description: "System configuration",
  },
];

export function AdminLayout({
  children,
  title = "Dashboard",
  description,
  breadcrumbs = [],
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const defaultBreadcrumbs = [
    { label: "Admin", href: "/admin" },
    ...breadcrumbs,
  ];

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50/50 dark:bg-gray-950/50">
        {/* Enhanced Sidebar */}
        <aside
          className={cn(
            "flex flex-col bg-white dark:bg-gray-900 border-r-2 border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out shadow-lg",
            sidebarCollapsed ? "w-16" : "w-80",
          )}
        >
          {/* Logo Section */}
          <div className="flex h-20 items-center border-b-2 border-gray-100 dark:border-gray-800 px-6 py-4">
            {!sidebarCollapsed ? (
              <Link href="/admin" className="flex items-center space-x-4 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md group-hover:shadow-lg transition-all duration-200">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    ChatWidget
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Admin Panel
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href="/admin"
                className="flex items-center justify-center group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                const buttonContent = (
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-4 h-14 px-4 py-3 text-left font-medium transition-all duration-200 rounded-xl mb-1",
                      sidebarCollapsed && "justify-center px-3",
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800 shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                    )}
                    asChild
                  >
                    <Link href={item.href} className="group">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center transition-colors rounded-lg p-1",
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {!sidebarCollapsed && (
                        <>
                          <div className="flex-1 flex flex-col space-y-1">
                            <span className="text-sm font-semibold">
                              {item.title}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 leading-relaxed">
                              {item.description}
                            </span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "New" ? "default" : "secondary"
                              }
                              className={cn(
                                "ml-auto text-xs px-3 py-1 font-medium rounded-full",
                                item.badge === "New" &&
                                  "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800",
                                item.badge === "Beta" &&
                                  "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 dark:border-orange-800",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </Button>
                );

                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.href} delayDuration={0}>
                      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                      <TooltipContent side="right" className="flex flex-col">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        {item.badge && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={item.href}>{buttonContent}</div>;
              })}
            </nav>
          </ScrollArea>

          {/* Collapse Button */}
          <div className="border-t-2 border-gray-100 dark:border-gray-800 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "w-full h-12 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                sidebarCollapsed ? "justify-center px-3" : "justify-start px-4",
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-3" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className="flex h-20 items-center justify-between border-b-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 py-4 shadow-md">
            <div className="flex items-center space-x-8">
              {/* Breadcrumbs */}
              <Breadcrumb>
                <BreadcrumbList>
                  {defaultBreadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {index === defaultBreadcrumbs.length - 1 ? (
                          <BreadcrumbPage className="font-medium text-gray-900 dark:text-white">
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={crumb.href || "#"}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < defaultBreadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              {/* Quick Search */}
              <div className="hidden md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-72 h-12 justify-start text-gray-500 dark:text-gray-400 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl px-4"
                >
                  <Search className="h-4 w-4 mr-3" />
                  <span className="font-medium">Search...</span>
                  <div className="ml-auto flex items-center space-x-2">
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-md border-2 bg-muted px-2 font-mono text-[11px] font-medium text-muted-foreground">
                      <Command className="h-3 w-3" />
                    </kbd>
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-md border-2 bg-muted px-2 font-mono text-[11px] font-medium text-muted-foreground">
                      K
                    </kbd>
                  </div>
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative h-12 w-12 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center font-bold border-2 border-white dark:border-gray-900"
                >
                  3
                </Badge>
              </Button>

              {/* Help */}
              <Button
                variant="ghost"
                size="sm"
                className="h-12 w-12 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>

              <Separator
                orientation="vertical"
                className="h-8 w-0.5 bg-gray-200 dark:bg-gray-700"
              />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 p-1"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="Admin"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold border-2 border-white dark:border-gray-900">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 p-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-2">
                      <p className="text-base font-semibold leading-none">
                        Admin User
                      </p>
                      <p className="text-sm leading-none text-muted-foreground">
                        admin@chatwidget.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer h-12 px-3 py-2 rounded-lg">
                    <User className="mr-3 h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer h-12 px-3 py-2 rounded-lg">
                    <Cog className="mr-3 h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer h-12 px-3 py-2 rounded-lg">
                    <Shield className="mr-3 h-5 w-5" />
                    <span className="font-medium">Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer h-12 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50">
            <div className="container mx-auto p-8 max-w-7xl">
              {/* Page Header */}
              <div className="mb-10">
                <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="outline"
                      className="text-sm px-4 py-2 rounded-full border-2"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Live
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <div className="space-y-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
