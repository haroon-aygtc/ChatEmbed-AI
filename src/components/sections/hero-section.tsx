"use client";
import { Button } from "@/components/ui/button";
import ChatWidget from "@/components/chat/ChatWidget";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [startDemo, setStartDemo] = useState(false);

  const handleWatchDemo = () => {
    setIsWidgetOpen(true);
    setStartDemo(true);
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
                className="text-base px-8"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
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
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />

              {/* Widget Container */}
              <div className="relative w-[480px] h-[720px] border rounded-2xl overflow-hidden shadow-2xl bg-background/80 backdrop-blur-sm">
                <ChatWidget
                  position="bottom-right"
                  isOpen={isWidgetOpen}
                  onToggle={setIsWidgetOpen}
                  startDemo={startDemo}
                  onDemoComplete={() => setStartDemo(false)}
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse delay-1000" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
