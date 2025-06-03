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
  },
  {
    title: "Widget Builder",
    href: "/admin/widget",
    icon: Code,
    badge: "New",
  },
  {
    title: "AI Configuration",
    href: "/admin/ai-config",
    icon: Zap,
    badge: null,
  },
  {
    title: "Knowledge Base",
    href: "/admin/knowledge-base",
    icon: Book,
    badge: null,
  },
  {
    title: "Prompt Flow",
    href: "/admin/prompt-flow",
    icon: FileText,
    badge: "Beta",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Team",
    href: "/admin/team",
    icon: Users,
    badge: null,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
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
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <aside
          className={cn(
            "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-4">
            {!sidebarCollapsed ? (
              <Link href="/admin" className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">ChatWidget</span>
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
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
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      sidebarCollapsed && "justify-center px-2",
                      isActive && "bg-secondary/80 text-secondary-foreground",
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4 shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="outline"
                              className="ml-auto text-xs"
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
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={item.href}>{buttonContent}</div>;
              })}
            </nav>
          </ScrollArea>

          {/* Collapse Button */}
          <div className="border-t p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "w-full",
                sidebarCollapsed ? "justify-center px-2" : "justify-start",
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center space-x-4">
              {/* Breadcrumbs */}
              <Breadcrumb>
                <BreadcrumbList>
                  {defaultBreadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {index === defaultBreadcrumbs.length - 1 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={crumb.href || "#"}
                            className="transition-colors hover:text-foreground"
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
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>

              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="Admin"
                      />
                      <AvatarFallback>AD</AvatarFallback>
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
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Cog className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {description && (
                  <p className="text-muted-foreground mt-2">{description}</p>
                )}
              </div>

              {/* Page Content */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
