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
            <div className="space-y-8">
              {/* Robotic Animated Presenter Character */}
              <div className="relative">
                <div className="w-64 h-72 mx-auto relative">
                  {/* Character Body with Robotic Presentation Animation */}
                  <div
                    className="absolute inset-0 animate-robot-movement"
                    style={{ animationDuration: "10s" }}
                  >
                    {/* Robotic Head */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg border-2 border-gray-600 shadow-lg">
                      {/* Head Panel Lines */}
                      <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-600" />
                      <div className="absolute top-4 left-2 right-2 h-0.5 bg-gray-600" />

                      {/* Antenna */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-600 rounded-full" />
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-red-700" />

                      {/* Robotic Eyes with LED animation */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-cyan-600 shadow-inner animate-robot-blink">
                          <div className="w-2 h-2 bg-cyan-200 rounded-full mt-1 ml-1 animate-pulse" />
                          <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
                        </div>
                        <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-cyan-600 shadow-inner animate-robot-blink">
                          <div className="w-2 h-2 bg-cyan-200 rounded-full mt-1 ml-1 animate-pulse" />
                          <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
                        </div>
                      </div>

                      {/* Sensor Array */}
                      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        <div
                          className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-1 h-1 bg-red-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>

                      {/* Speaker Grille */}
                      <div className="absolute top-13 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-700 rounded border border-gray-800">
                        <div className="flex space-x-0.5 mt-0.5 ml-1">
                          <div className="w-0.5 h-2 bg-gray-500 rounded animate-robot-speaking" />
                          <div
                            className="w-0.5 h-2 bg-gray-500 rounded animate-robot-speaking"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-0.5 h-2 bg-gray-500 rounded animate-robot-speaking"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-0.5 h-2 bg-gray-500 rounded animate-robot-speaking"
                            style={{ animationDelay: "0.3s" }}
                          />
                          <div
                            className="w-0.5 h-2 bg-gray-500 rounded animate-robot-speaking"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Robotic Neck Joint */}
                    <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-gray-400 to-gray-500 border border-gray-600 rounded" />
                    <div className="absolute top-19 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 border border-gray-700 rounded" />

                    {/* Robotic Chest Panel */}
                    <div className="absolute top-22 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-lg shadow-lg border-2 border-gray-600">
                      {/* Chest Display Panel */}
                      <div className="absolute top-2 left-2 right-2 h-8 bg-black rounded border border-gray-700">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-xs text-green-400 font-mono animate-pulse">
                            AI-CHAT
                          </div>
                        </div>
                      </div>

                      {/* Status LEDs */}
                      <div className="absolute top-12 left-3 flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <div
                          className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                          style={{ animationDelay: "1s" }}
                        />
                      </div>

                      {/* Control Buttons */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="w-3 h-3 bg-red-600 rounded border border-red-800" />
                        <div className="w-3 h-3 bg-blue-600 rounded border border-blue-800" />
                      </div>

                      {/* Ventilation Grilles */}
                      <div className="absolute bottom-2 left-2 right-2 space-y-1">
                        <div className="h-0.5 bg-gray-600 rounded" />
                        <div className="h-0.5 bg-gray-600 rounded" />
                        <div className="h-0.5 bg-gray-600 rounded" />
                      </div>
                    </div>

                    {/* Robotic Arms with servo joints */}
                    <div className="absolute top-26 -left-5 w-5 h-14 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full transform rotate-45 animate-robot-gesture-left shadow-md border border-gray-600">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-600 rounded border border-gray-700" />
                    </div>
                    <div className="absolute top-26 -right-5 w-5 h-14 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full transform -rotate-45 animate-robot-gesture-right shadow-md border border-gray-600">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-600 rounded border border-gray-700" />
                    </div>

                    {/* Robotic Hands */}
                    <div className="absolute top-38 -left-7 w-4 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded border border-gray-600 shadow-sm animate-robot-point-left">
                      <div className="absolute top-1 left-1 w-2 h-3 bg-gray-500 rounded" />
                    </div>
                    <div className="absolute top-38 -right-7 w-4 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded border border-gray-600 shadow-sm animate-robot-point-right">
                      <div className="absolute top-1 left-1 w-2 h-3 bg-gray-500 rounded" />
                    </div>

                    {/* Robotic Lower Body */}
                    <div className="absolute top-44 left-1/2 transform -translate-x-1/2 w-18 h-20 bg-gradient-to-b from-gray-500 to-gray-600 rounded-lg shadow-lg border-2 border-gray-700">
                      {/* Power Core */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-700 animate-pulse">
                        <div className="w-4 h-4 bg-blue-300 rounded-full mt-1 ml-1" />
                      </div>

                      {/* Leg Joints */}
                      <div className="absolute bottom-2 left-3 w-4 h-4 bg-gray-600 rounded border border-gray-700" />
                      <div className="absolute bottom-2 right-3 w-4 h-4 bg-gray-600 rounded border border-gray-700" />
                    </div>

                    {/* Robotic Feet */}
                    <div className="absolute top-62 left-3 w-7 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded shadow-lg border border-gray-800" />
                    <div className="absolute top-62 right-3 w-7 h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded shadow-lg border border-gray-800" />

                    {/* Foot Details */}
                    <div className="absolute top-63 left-4 w-5 h-1 bg-gray-800 rounded" />
                    <div className="absolute top-63 right-4 w-5 h-1 bg-gray-800 rounded" />
                  </div>

                  {/* Interactive Holographic Presentation Board */}
                  <div className="absolute -right-28 -top-16 w-48 h-40 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border-4 border-cyan-500 transform rotate-12 overflow-hidden">
                    {/* Holographic Header */}
                    <div className="h-4 bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mx-0.5 animate-pulse" />
                      <div
                        className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full mx-0.5 animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>

                    {/* Holographic Content */}
                    <div className="p-4 relative h-full bg-gradient-to-br from-gray-900 to-black">
                      {/* Sequential Content Display */}

                      {/* Step 1: System Introduction */}
                      <div
                        className="absolute top-1 left-2 text-sm font-bold text-cyan-400 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "1s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        🤖 AI Chat System v2.0
                      </div>

                      {/* Step 2: Website Integration */}
                      <div
                        className="absolute top-5 left-2 w-5 h-5 border-2 border-blue-400 rounded-lg animate-sequential-appear opacity-0 flex items-center justify-center"
                        style={{
                          animationDelay: "3s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded animate-pulse" />
                      </div>
                      <div
                        className="absolute top-7 left-0.5 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "3.5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        Website
                      </div>

                      {/* Step 3: User Interaction */}
                      <div
                        className="absolute top-5 left-9 w-4 h-4 border-2 border-green-400 rounded-full animate-sequential-appear opacity-0 flex items-center justify-center"
                        style={{
                          animationDelay: "5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </div>
                      <div
                        className="absolute top-7 left-8.5 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "5.5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        User
                      </div>

                      {/* Step 4: Connection Flow */}
                      <div
                        className="absolute top-6 left-14 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "7s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      />
                      <div
                        className="absolute top-5.5 left-21 w-0 h-0 border-l-2 border-l-orange-400 border-t-1 border-b-1 border-transparent animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "7.5s",
                          animationDuration: "0.5s",
                          animationFillMode: "forwards",
                        }}
                      />

                      {/* Step 5: AI Processing */}
                      <div
                        className="absolute top-4 right-8 w-6 h-6 border-2 border-purple-400 rounded-lg animate-sequential-appear opacity-0 flex items-center justify-center"
                        style={{
                          animationDelay: "9s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="w-3 h-3 bg-purple-400 rounded animate-pulse" />
                        <div className="absolute -top-1 -left-1 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                        <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
                      </div>
                      <div
                        className="absolute top-10.5 right-6 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "9.5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        AI Brain
                      </div>

                      {/* Step 6: Knowledge Base */}
                      <div
                        className="absolute top-13 right-8 w-5 h-4 border border-teal-400 rounded animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "11s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="mt-0.5 ml-0.5 space-y-0.5">
                          <div className="w-3 h-0.5 bg-teal-400 rounded animate-pulse" />
                          <div className="w-2 h-0.5 bg-teal-300 rounded animate-pulse" />
                          <div className="w-2.5 h-0.5 bg-teal-300 rounded animate-pulse" />
                        </div>
                      </div>
                      <div
                        className="absolute top-18 right-6 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "11.5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        Knowledge
                      </div>

                      {/* Step 7: Smart Response */}
                      <div
                        className="absolute top-13 left-3 w-10 h-4 border border-orange-400 rounded animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "13s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="flex space-x-1 mt-0.5 ml-0.5">
                          <div className="w-1 h-2 bg-orange-400 rounded animate-pulse" />
                          <div className="w-1 h-1.5 bg-orange-300 rounded animate-pulse" />
                          <div className="w-1 h-2 bg-orange-400 rounded animate-pulse" />
                          <div className="w-1 h-1 bg-orange-300 rounded animate-pulse" />
                        </div>
                      </div>
                      <div
                        className="absolute top-18 left-2 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "13.5s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        Response
                      </div>

                      {/* Step 8: Multi-Model Support */}
                      <div
                        className="absolute top-21 left-2 right-2 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "15s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        🔄 Multi-AI Models: GPT, Gemini, Mistral
                      </div>

                      {/* Step 9: Real-time Features */}
                      <div
                        className="absolute top-24 left-2 right-2 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "17s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        ⚡ WebSocket • Real-time • Analytics
                      </div>

                      {/* Step 10: Easy Integration */}
                      <div
                        className="absolute top-27 left-2 right-2 text-xs text-cyan-300 animate-sequential-appear opacity-0"
                        style={{
                          animationDelay: "19s",
                          animationDuration: "1s",
                          animationFillMode: "forwards",
                        }}
                      >
                        📦 &lt;5KB Embed • No-Code Setup
                      </div>
                    </div>

                    {/* Robotic Laser Pointer */}
                    <div
                      className="absolute -bottom-4 -right-4 w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-400 rounded border border-gray-600 shadow-lg animate-robot-pointer"
                      style={{ animationDelay: "2s" }}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded mt-1.5 ml-1.5 animate-pulse" />
                      {/* Laser beam */}
                      <div className="absolute -top-3 left-2 w-0.5 h-5 bg-red-500 rounded-full opacity-70 animate-pulse" />
                    </div>
                  </div>

                  {/* Sequential Robot Speech Bubbles */}
                  <div
                    className="absolute -top-16 -right-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-3 shadow-xl border-2 border-cyan-400 animate-robot-speech-1"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="text-xs text-cyan-300 whitespace-nowrap font-mono">
                      INITIALIZING AI CHAT SYSTEM...
                    </div>
                    <div className="absolute bottom-0 left-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-800" />
                  </div>

                  {/* Second Robot Speech Bubble */}
                  <div
                    className="absolute -top-12 -right-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2 shadow-lg border-2 border-green-400 animate-robot-speech-2"
                    style={{ animationDelay: "8s" }}
                  >
                    <div className="text-xs text-green-300 whitespace-nowrap font-mono">
                      MULTI-MODEL SUPPORT ACTIVE
                    </div>
                    <div className="absolute bottom-0 left-4 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-gray-800" />
                  </div>

                  {/* Third Robot Speech Bubble */}
                  <div
                    className="absolute -top-8 -right-28 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2 shadow-lg border-2 border-purple-400 animate-robot-speech-3"
                    style={{ animationDelay: "14s" }}
                  >
                    <div className="text-xs text-purple-300 whitespace-nowrap font-mono">
                      KNOWLEDGE BASE INTEGRATED
                    </div>
                    <div className="absolute bottom-0 left-4 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-gray-800" />
                  </div>

                  {/* Fourth Robot Speech Bubble */}
                  <div
                    className="absolute -top-4 -right-32 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2 shadow-lg border-2 border-yellow-400 animate-robot-speech-4"
                    style={{ animationDelay: "20s" }}
                  >
                    <div className="text-xs text-yellow-300 whitespace-nowrap font-mono">
                      READY FOR DEPLOYMENT
                    </div>
                    <div className="absolute bottom-0 left-4 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-gray-800" />
                  </div>
                </div>
              </div>

              {/* Feature Animations */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground animate-fade-in">
                    Smart Chat Assistant
                  </h2>
                  <p
                    className="text-lg text-muted-foreground max-w-md animate-fade-in"
                    style={{ animationDelay: "0.5s" }}
                  >
                    AI-powered chat widget that learns and adapts to provide
                    contextual responses for your website visitors.
                  </p>
                </div>

                {/* Animated Features */}
                <div className="space-y-4">
                  <div
                    className="flex items-center space-x-3 animate-slide-in"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Real-time AI responses
                    </span>
                  </div>

                  <div
                    className="flex items-center space-x-3 animate-slide-in"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Customizable knowledge base
                    </span>
                  </div>

                  <div
                    className="flex items-center space-x-3 animate-slide-in"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Easy website integration
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground animate-fade-in"
                style={{ animationDelay: "2.5s" }}
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-background" />
                  <div className="w-8 h-8 bg-primary/40 rounded-full border-2 border-background" />
                  <div className="w-8 h-8 bg-primary/50 rounded-full border-2 border-background" />
                </div>
                <span>Trusted by 10,000+ websites</span>
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
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl shadow-primary/10 dark:shadow-primary/5 space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
