"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { OverviewSection } from "@/components/admin/sections/OverviewSection";
import { WidgetConfigSection } from "@/components/admin/sections/WidgetConfigSection";
import { AIConfigSection } from "@/components/admin/sections/AIConfigSection";
import { KnowledgeBaseSection } from "@/components/admin/sections/KnowledgeBaseSection";
import { PromptFlowSection } from "@/components/admin/sections/PromptFlowSection";
import { AnalyticsSection } from "@/components/admin/sections/AnalyticsSection";
import { TeamSection } from "@/components/admin/sections/TeamSection";
import { UserManagementSection } from "@/components/admin/sections/UserManagementSection";
import { SettingsSection } from "@/components/admin/sections/SettingsSection";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AdminDashboardProps {
  initialSection?: string;
}

function AdminDashboardContent({
  initialSection = "overview",
}: AdminDashboardProps) {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || initialSection;

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "widget":
        return <WidgetConfigSection />;
      case "ai-config":
        return <AIConfigSection />;
      case "knowledge-base":
        return <KnowledgeBaseSection />;
      case "prompt-flow":
        return <PromptFlowSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "team":
        return <TeamSection />;
      case "user-management":
        return <UserManagementSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "overview":
        return "Dashboard Overview";
      case "widget":
        return "Widget Configuration";
      case "ai-config":
        return "AI Configuration";
      case "knowledge-base":
        return "Knowledge Base";
      case "prompt-flow":
        return "Prompt Flow Editor";
      case "analytics":
        return "Analytics & Insights";
      case "team":
        return "Team Management";
      case "user-management":
        return "User Management";
      case "settings":
        return "System Settings";
      default:
        return "Dashboard";
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case "overview":
        return "Monitor your chat system performance and key metrics";
      case "widget":
        return "Customize your chat widget appearance and behavior";
      case "ai-config":
        return "Configure AI models, prompts, and response settings";
      case "knowledge-base":
        return "Manage documents and knowledge sources for AI responses";
      case "prompt-flow":
        return "Design conversation flows and conditional responses";
      case "analytics":
        return "Analyze chat performance and user engagement metrics";
      case "team":
        return "Manage team members and access permissions";
      case "user-management":
        return "Manage users, roles, and permissions across the system";
      case "settings":
        return "Configure system-wide settings and preferences";
      default:
        return "";
    }
  };

  const getBreadcrumbs = () => {
    const sectionMap: Record<string, string> = {
      overview: "Overview",
      widget: "Widget",
      "ai-config": "AI Config",
      "knowledge-base": "Knowledge Base",
      "prompt-flow": "Prompt Flow",
      analytics: "Analytics",
      team: "Team",
      "user-management": "User Management",
      settings: "Settings",
    };

    return [{ label: sectionMap[activeSection] || "Dashboard" }];
  };

  return (
    <AdminLayout
      title={getSectionTitle()}
      description={getSectionDescription()}
      breadcrumbs={getBreadcrumbs()}
    >
      <Suspense fallback={<LoadingSpinner />}>{renderSection()}</Suspense>
    </AdminLayout>
  );
}

export default function AdminDashboard(props: AdminDashboardProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboardContent {...props} />
    </Suspense>
  );
}
