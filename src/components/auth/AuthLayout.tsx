"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  illustration?: ReactNode;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Column - Illustration/Marketing Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          {illustration || (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/40 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Welcome to Our Platform
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Join thousands of users who trust our secure and intuitive
                  platform for their daily needs.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-background" />
                  <div className="w-8 h-8 bg-primary/40 rounded-full border-2 border-background" />
                  <div className="w-8 h-8 bg-primary/50 rounded-full border-2 border-background" />
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
