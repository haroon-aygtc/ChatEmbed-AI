"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
    href: "/admin?section=overview",
    section: "overview",
    icon: Layout,
    badge: null,
    description: "Dashboard overview",
  },
  {
    title: "Widget Builder",
    href: "/admin?section=widget",
    section: "widget",
    icon: Palette,
    badge: "New",
    description: "Customize widget appearance",
  },
  {
    title: "AI Configuration",
    href: "/admin?section=ai-config",
    section: "ai-config",
    icon: Sparkles,
    badge: null,
    description: "Configure AI models",
  },
  {
    title: "Knowledge Base",
    href: "/admin?section=knowledge-base",
    section: "knowledge-base",
    icon: Book,
    badge: null,
    description: "Manage content library",
  },
  {
    title: "Prompt Flow",
    href: "/admin?section=prompt-flow",
    section: "prompt-flow",
    icon: FileText,
    badge: "Beta",
    description: "Design conversation flows",
  },
  {
    title: "Analytics",
    href: "/admin?section=analytics",
    section: "analytics",
    icon: BarChart3,
    badge: null,
    description: "Performance insights",
  },
  {
    title: "User Management",
    href: "/admin?section=user-management",
    section: "user-management",
    icon: Users,
    badge: "New",
    description: "Manage users, roles & permissions",
  },
  {
    title: "Team",
    href: "/admin?section=team",
    section: "team",
    icon: Users,
    badge: null,
    description: "Manage team members",
  },
  {
    title: "Settings",
    href: "/admin?section=settings",
    section: "settings",
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
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section") || "overview";

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
            "flex flex-col bg-white dark:bg-gray-950 border-r-2 border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out shadow-lg",
            sidebarCollapsed ? "w-20" : "w-80",
          )}
        >
          {/* Logo Section */}
          <div className="flex h-20 items-center justify-center border-b-2 border-gray-100 dark:border-gray-800 px-4 py-4">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md group-hover:shadow-lg transition-all duration-200">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </Link>
            )}
          </div>

          {/* User Profile Section */}
          <div className="border-b-2 border-gray-100 dark:border-gray-800 p-4">
            {!sidebarCollapsed ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 group cursor-pointer">
                  <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-gray-800 shadow-md">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="Admin"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      admin@chatwidget.com
                    </p>
                  </div>
                </div>

                {/* Profile Settings and Logout in one line */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-12 justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 rounded-xl border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-12 justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 rounded-xl border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                  >
                    <Cog className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-12 justify-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 rounded-xl border border-transparent hover:border-red-200 dark:hover:border-red-800"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Collapsed User Avatar */}
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-12 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
                    >
                      <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800 shadow-md">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                          alt="Admin"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex flex-col">
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">
                      admin@chatwidget.com
                    </p>
                  </TooltipContent>
                </Tooltip>

                {/* Collapsed Quick Actions */}
                <div className="flex flex-col gap-2">
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-12 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl"
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Profile Settings</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-12 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 rounded-xl"
                      >
                        <Cog className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Account Settings</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-12 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-xl"
                      >
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Sign Out</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-8 py-6">
            <nav className="space-y-4 border-b-2 border-gray-100 dark:border-gray-800">
              {sidebarItems.map((item, index) => {
                // Check if this item is active based on current section
                const isActive = currentSection === item.section;
                const Icon = item.icon;

                const buttonContent = (
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full transition-all gap-4 h-16 px-4 py-3 text-left font-medium duration-200 rounded-none rounded-xl",
                      sidebarCollapsed
                        ? "h-14 justify-center px-3 py-3 text-center"
                        : "h-16 justify-start gap-4 px-4 py-3 text-left",
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white",
                    )}
                    asChild
                  >
                    <Link href={item.href} className="group">
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors rounded-lg p-1",
                          sidebarCollapsed
                            ? "h-8 w-8 mx-auto"
                            : "h-7 w-7 p-1.5",
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50",
                        )}
                      >
                        <Icon
                          className={cn(
                            sidebarCollapsed ? "h-5 w-5" : "h-5 w-5",
                          )}
                        />
                      </div>
                      {!sidebarCollapsed && (
                        <>
                          <div className="flex-1 flex flex-col space-y-1.5 min-w-0">
                            <span className="text-sm font-semibold truncate">
                              {item.title}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 leading-relaxed line-clamp-2">
                              {item.description}
                            </span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "New" ? "default" : "secondary"
                              }
                              className={cn(
                                "ml-3 text-xs px-2.5 py-1 font-medium rounded-full flex-shrink-0",
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
                    <div key={item.href}>
                      <Tooltip delayDuration={0}>
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
                      {/* Full width bottom border */}
                      {index < sidebarItems.length - 1 && (
                        <div className="border-b border-gray-100 dark:border-gray-800/50 mx-0" />
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.href}>
                    {buttonContent}
                    {/* Full width bottom border */}
                    {index < sidebarItems.length - 1 && (
                      <div className="border-b border-gray-100 dark:border-gray-800/50 mx-0" />
                    )}
                  </div>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Collapse Button */}
          <div className="border-t-2 border-gray-100 dark:border-gray-800 p-3 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "w-full h-12 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                sidebarCollapsed ? "justify-center px-2" : "justify-start px-4",
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
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
        <div className="flex flex-1 flex-col min-h-0">
          {/* Enhanced Header */}
          <header className="flex-shrink-0 flex h-20 items-center justify-between border-b-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-8 py-4 shadow-md z-10">
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
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center font-bold border-2 border-white dark:border-gray-950"
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
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold border-2 border-white dark:border-gray-950">
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
            <div className="p-8 w-full">
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
              <div className="space-y-8 w-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
