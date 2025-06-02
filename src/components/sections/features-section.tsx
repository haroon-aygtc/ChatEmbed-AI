"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Database,
  Cpu,
  Settings,
  Shield,
  Globe,
  Zap,
  Brain,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Multi-AI Model Support",
      description:
        "Seamlessly integrate with Gemini, OpenAI, Mistral, and more AI providers.",
      badge: "Popular",
      color: "text-blue-500",
    },
    {
      icon: Database,
      title: "Knowledge Base Integration",
      description:
        "Context-aware responses powered by your own content and documentation.",
      badge: "Essential",
      color: "text-green-500",
    },
    {
      icon: Cpu,
      title: "Visual Prompt Flow Editor",
      description:
        "Design complex conversation flows without coding using our intuitive editor.",
      badge: "New",
      color: "text-purple-500",
    },
    {
      icon: Settings,
      title: "Customizable Response Formatting",
      description:
        "Control how AI responses appear with your brand voice and style guidelines.",
      badge: null,
      color: "text-orange-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Sub-5KB loader script with JWT authentication and comprehensive security.",
      badge: "Secure",
      color: "text-red-500",
    },
    {
      icon: Globe,
      title: "Responsive Design",
      description:
        "Perfect experience on desktop, tablet, and mobile with consistent UX.",
      badge: null,
      color: "text-cyan-500",
    },
    {
      icon: Zap,
      title: "Real-time WebSocket",
      description:
        "Instant message delivery and typing indicators for seamless conversations.",
      badge: "Fast",
      color: "text-yellow-500",
    },
    {
      icon: Brain,
      title: "Context Awareness",
      description:
        "AI understands conversation history and provides relevant, intelligent responses.",
      badge: "Smart",
      color: "text-indigo-500",
    },
    {
      icon: Palette,
      title: "Theme Customization",
      description:
        "Match your brand with customizable colors, fonts, and styling options.",
      badge: null,
      color: "text-pink-500",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Powerful Features for Modern Websites
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to create an exceptional chat experience that
              converts visitors into customers
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                      {feature.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
