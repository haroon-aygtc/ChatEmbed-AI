"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "The AI chat widget transformed our customer support. Response times dropped by 70% and customer satisfaction increased dramatically. The setup was incredibly simple.",
      rating: 5,
      badge: "Enterprise",
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder",
      company: "StartupLab",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      content:
        "As a startup, we needed something that worked out of the box. This chat system handles 80% of our customer queries automatically, letting us focus on product development.",
      rating: 5,
      badge: "Startup",
    },
    {
      name: "Emily Watson",
      role: "Head of Customer Success",
      company: "RetailPlus",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      content:
        "The knowledge base integration is phenomenal. Our AI assistant knows our entire product catalog and provides accurate, helpful responses 24/7.",
      rating: 5,
      badge: "E-commerce",
    },
    {
      name: "David Kim",
      role: "Product Manager",
      company: "FinanceApp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      content:
        "Security was our top concern. The JWT authentication and enterprise-grade security features gave us confidence to deploy this across all our client portals.",
      rating: 5,
      badge: "Finance",
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "GrowthCo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      content:
        "The customization options are endless. We matched our brand perfectly and the widget feels like a natural part of our website. Conversion rates improved by 35%.",
      rating: 5,
      badge: "Marketing",
    },
    {
      name: "James Wilson",
      role: "Technical Lead",
      company: "DevTools Inc",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      content:
        "The API is well-documented and the integration was seamless. We had it running in production within an hour. The performance impact is virtually zero.",
      rating: 5,
      badge: "Developer",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
              Trusted by Industry Leaders
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how companies across industries are transforming their
              customer experience
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">
                Active Websites
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-sm leading-relaxed mb-4">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.badge}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
