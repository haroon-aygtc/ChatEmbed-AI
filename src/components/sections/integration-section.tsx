"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function IntegrationSection() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;
    w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://widget.chatai.com/loader.js'));
  cw('init', { id: 'YOUR_WIDGET_ID' });
</script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const integrationFeatures = [
    {
      icon: Code,
      title: "Lightweight Script",
      description: "Under 5KB loader with lazy loading",
      color: "text-blue-500",
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works with any website or platform",
      color: "text-green-500",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "JWT authentication and CSP compliant",
      color: "text-red-500",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Live in minutes, not hours",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Code Example */}
          <motion.div
            className="flex justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="w-full max-w-[600px] bg-background/80 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Integration Code</CardTitle>
                  </div>
                  <Badge variant="secondary">HTML</Badge>
                </div>
                <CardDescription>
                  Copy and paste this snippet before your closing &lt;/body&gt;
                  tag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="text-sm overflow-x-auto p-4 bg-muted/50 rounded-lg border border-border/50 font-mono">
                    <code className="text-foreground whitespace-pre-wrap">
                      {codeSnippet}
                    </code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Replace{" "}
                  <code className="bg-muted px-1 rounded">YOUR_WIDGET_ID</code>{" "}
                  with your unique widget identifier from the dashboard.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col justify-center space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple Integration,
                <span className="text-primary block">Powerful Results</span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Add our intelligent chat widget to any website with a single
                code snippet. No complex setup, no technical expertise required.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {integrationFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className={`h-5 w-5 mt-0.5 ${feature.color}`} />
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8">
                Get Your Widget Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
