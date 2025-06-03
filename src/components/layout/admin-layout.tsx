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
            "flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out shadow-sm",
            sidebarCollapsed ? "w-16" : "w-72",
          )}
        >
          {/* Logo Section */}
          <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-4">
            {!sidebarCollapsed ? (
              <Link href="/admin" className="flex items-center space-x-3 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ChatWidget
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
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
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                const buttonContent = (
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-11 px-3 text-left font-medium transition-all duration-200",
                      sidebarCollapsed && "justify-center px-2",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                    )}
                    asChild
                  >
                    <Link href={item.href} className="group">
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center transition-colors",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {!sidebarCollapsed && (
                        <>
                          <div className="flex-1 flex flex-col">
                            <span className="text-sm">{item.title}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                              {item.description}
                            </span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "New" ? "default" : "secondary"
                              }
                              className={cn(
                                "ml-auto text-xs px-2 py-0.5",
                                item.badge === "New" &&
                                  "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                                item.badge === "Beta" &&
                                  "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
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
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "w-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                sidebarCollapsed ? "justify-center px-2" : "justify-start",
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 shadow-sm">
            <div className="flex items-center space-x-6">
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
                  className="w-64 justify-start text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Search className="h-4 w-4 mr-2" />
                  <span>Search...</span>
                  <div className="ml-auto flex items-center space-x-1">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <Command className="h-3 w-3" />
                    </kbd>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      K
                    </kbd>
                  </div>
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>

              {/* Help */}
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="Admin"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-medium">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Admin User
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@chatwidget.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50">
            <div className="container mx-auto p-6 max-w-7xl">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <div className="space-y-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
