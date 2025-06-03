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
            "flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          {/* Logo Section */}
          <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-4">
            {!sidebarCollapsed ? (
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ChatWidget
                  </span>
                </div>
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
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
                      "w-full justify-start gap-3 h-10 px-3 text-left font-medium transition-colors border-b border-gray-100/50 dark:border-gray-800/50 rounded-none mb-0",
                      sidebarCollapsed && "justify-center px-2",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-auto text-xs px-2 py-0 h-5"
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

          {/* User Profile Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="Admin"
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      admin@example.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="h-8 px-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full h-8 px-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="Admin"
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="w-full h-8 px-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6">
            <div className="flex items-center space-x-4">
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
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < defaultBreadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
            <div className="h-full p-6">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {description}
                      </p>
                    )}
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
