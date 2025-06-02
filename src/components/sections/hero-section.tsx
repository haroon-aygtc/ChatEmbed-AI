"use client";
import { Button } from "@/components/ui/button";
import AnimatedChatDemo from "@/components/chat/AnimatedChatDemo";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [demoState, setDemoState] = useState<
    "idle" | "starting" | "running" | "completed"
  >("idle");

  const handleWatchDemo = () => {
    if (demoState === "idle" || demoState === "completed") {
      setDemoState("starting");
      // Small delay for smooth transition
      setTimeout(() => {
        setIsDemoPlaying(true);
        setDemoState("running");
      }, 300);
    }
  };

  const handleDemoComplete = () => {
    setIsDemoPlaying(false);
    setDemoState("completed");
    // Auto-reset after 3 seconds for re-watching
    setTimeout(() => {
      setDemoState("idle");
    }, 3000);
  };

  // Reset demo when needed
  const resetDemo = () => {
    setIsDemoPlaying(false);
    setDemoState("idle");
  };

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-background/50 backdrop-blur-sm w-fit">
              <Sparkles className="h-3 w-3 mr-2 text-primary" />
              AI-Powered Chat System
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Transform Your Website with
                <span className="text-primary block">Intelligent Chat</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Enhance customer engagement with our AI-powered embeddable chat
                widget. Context-aware responses, multiple AI models, and
                seamless integration in minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 transition-all duration-200"
                onClick={handleWatchDemo}
                disabled={demoState === "starting" || demoState === "running"}
              >
                {demoState === "starting" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Starting Demo
                  </>
                ) : demoState === "running" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-pulse bg-current rounded-full" />
                    Demo Running
                  </>
                ) : demoState === "completed" ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Again
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </>
                )}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-foreground">10,000+</span>
                <span>websites</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-foreground">99.9%</span>
                <span>uptime</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-foreground">&lt;5KB</span>
                <span>load size</span>
              </div>
            </div>
          </motion.div>

          {/* Demo Widget */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Enhanced Glow Effect with Animation */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Particles */}
              <motion.div
                className="absolute -top-8 -right-8 w-3 h-3 bg-primary/40 rounded-full"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-8 w-4 h-4 bg-secondary/30 rounded-full"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Widget Container - Enhanced Browser Environment */}
              <motion.div
                className="relative w-[440px] h-[680px] border-2 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Enhanced Browser Header */}
                <div className="h-10 bg-gradient-to-r from-muted/60 to-muted/40 border-b flex items-center px-4 gap-3">
                  <div className="flex gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-red-400/70"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-yellow-400/70"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-400/70"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground bg-background/60 rounded-md px-3 py-1 inline-flex items-center gap-2 border">
                      <div className="w-3 h-3 text-green-500">🔒</div>
                      yourwebsite.com
                    </div>
                  </div>
                </div>

                {/* Enhanced Website Content */}
                <div className="h-[calc(100%-2.5rem)] relative bg-gradient-to-br from-background via-background/98 to-muted/10 overflow-hidden">
                  {/* Animated Mock Content */}
                  <div className="p-6 space-y-4">
                    <motion.div
                      className="h-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-md w-3/4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    />
                    <motion.div
                      className="h-3 bg-muted/40 rounded w-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    />
                    <motion.div
                      className="h-3 bg-muted/40 rounded w-5/6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                    />
                    <motion.div
                      className="h-10 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg w-2/3 mt-8 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      <span className="text-xs text-primary font-medium">
                        Get Started
                      </span>
                    </motion.div>
                    <div className="space-y-3 mt-6">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="h-2 bg-muted/25 rounded w-full"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          style={{ transformOrigin: "left" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Animated Chat Demo */}
                  <AnimatedChatDemo
                    isPlaying={isDemoPlaying}
                    onComplete={handleDemoComplete}
                    primaryColor="#4f46e5"
                    secondaryColor="#ffffff"
                  />
                </div>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-6 w-6 h-6 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-full"
                animate={{
                  scale: [1, 0.8, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
