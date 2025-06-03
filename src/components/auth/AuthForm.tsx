"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormType = "login" | "register" | "forgot-password" | "reset-password";

interface AuthFormProps {
  type: FormType;
  onSubmit?: (data: any) => Promise<void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const getSchema = () => {
    switch (type) {
      case "login":
        return loginSchema;
      case "register":
        return registerSchema;
      case "forgot-password":
        return forgotPasswordSchema;
      case "reset-password":
        return resetPasswordSchema;
      default:
        return loginSchema;
    }
  };

  const form = useForm<z.infer<ReturnType<typeof getSchema>>>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "register" && { name: "", confirmPassword: "" }),
      ...(type === "reset-password" && { confirmPassword: "" }),
    },
  });

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - show success toast
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        toast({
          title: "Success!",
          description: getSuccessMessage(),
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSuccessMessage = () => {
    switch (type) {
      case "login":
        return "Welcome back! You've been successfully logged in.";
      case "register":
        return "Account created successfully! Please check your email to verify your account.";
      case "forgot-password":
        return "Password reset link has been sent to your email.";
      case "reset-password":
        return "Your password has been reset successfully.";
      default:
        return "Operation completed successfully.";
    }
  };

  const getButtonText = () => {
    switch (type) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "forgot-password":
        return "Send Reset Link";
      case "reset-password":
        return "Reset Password";
      default:
        return "Submit";
    }
  };

  const renderPasswordField = (
    name: string,
    label: string,
    showState: boolean,
    setShowState: (show: boolean) => void,
  ) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className={cn(fieldState.error && "text-destructive")}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showState ? "text" : "password"}
                className={cn(
                  "pr-10 h-12 text-base",
                  fieldState.error &&
                    "border-destructive focus-visible:ring-destructive",
                  !fieldState.error &&
                    field.value &&
                    "border-green-500 focus-visible:ring-green-500",
                )}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowState(!showState)}
              >
                {showState ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Name field for register */}
          {type === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={cn(fieldState.error && "text-destructive")}
                  >
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        "h-12 text-base",
                        fieldState.error &&
                          "border-destructive focus-visible:ring-destructive",
                        !fieldState.error &&
                          field.value &&
                          "border-green-500 focus-visible:ring-green-500",
                      )}
                      placeholder="Enter your full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn(fieldState.error && "text-destructive")}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className={cn(
                      "h-12 text-base",
                      fieldState.error &&
                        "border-destructive focus-visible:ring-destructive",
                      !fieldState.error &&
                        field.value &&
                        "border-green-500 focus-visible:ring-green-500",
                    )}
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password fields */}
          {(type === "login" ||
            type === "register" ||
            type === "reset-password") &&
            renderPasswordField(
              "password",
              "Password",
              showPassword,
              setShowPassword,
            )}

          {/* Confirm Password field */}
          {(type === "register" || type === "reset-password") &&
            renderPasswordField(
              "confirmPassword",
              "Confirm Password",
              showConfirmPassword,
              setShowConfirmPassword,
            )}

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {getButtonText()}
          </Button>
        </form>
      </Form>

      {/* Additional Links */}
      <div className="space-y-4">
        {type === "login" && (
          <div className="text-center space-y-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        {type === "register" && (
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        )}

        {type === "forgot-password" && (
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        )}

        {type === "reset-password" && (
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
