"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container relative px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 text-center text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Customer Experience?
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-primary-foreground/90 text-lg md:text-xl leading-relaxed mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of businesses already using our AI-powered chat
              system. Start your free trial today and see the difference
              intelligent automation can make.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-primary-foreground/80 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
