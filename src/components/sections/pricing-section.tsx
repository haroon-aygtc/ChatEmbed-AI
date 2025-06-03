"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight, Zap, Crown, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small websites and personal projects",
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      badge: null,
      features: [
        "Up to 1,000 conversations/month",
        "Basic AI model (GPT-3.5)",
        "Standard response time",
        "Email support",
        "Basic customization",
        "Knowledge base (10 documents)",
        "Standard analytics",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and e-commerce",
      icon: Crown,
      price: { monthly: 99, annual: 990 },
      badge: "Most Popular",
      features: [
        "Up to 10,000 conversations/month",
        "Advanced AI models (GPT-4, Gemini)",
        "Priority response time",
        "Priority support + live chat",
        "Full customization",
        "Knowledge base (100 documents)",
        "Advanced analytics",
        "A/B testing",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      icon: Building,
      price: { monthly: 299, annual: 2990 },
      badge: "Best Value",
      features: [
        "Unlimited conversations",
        "All AI models + custom models",
        "Instant response time",
        "Dedicated account manager",
        "White-label solution",
        "Unlimited knowledge base",
        "Custom analytics dashboard",
        "Advanced A/B testing",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
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
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect plan for your needs. All plans include a 14-day
              free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center space-x-4 mt-8">
            <Label
              htmlFor="billing-toggle"
              className={
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              }
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label
              htmlFor="billing-toggle"
              className={isAnnual ? "text-foreground" : "text-muted-foreground"}
            >
              Annual
            </Label>
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const monthlyPrice = isAnnual
              ? plan.price.annual / 12
              : plan.price.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`relative h-full bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg ${
                    plan.popular
                      ? "ring-2 ring-primary scale-105"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>

                    {/* Price */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          ${Math.round(monthlyPrice)}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Billed annually (${price})
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Contact */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer tailored plans for enterprise
            customers.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales Team
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
