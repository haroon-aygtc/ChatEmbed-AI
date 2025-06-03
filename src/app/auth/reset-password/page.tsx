import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your new password below"
      illustration={
        <div className="space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Almost There!
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Choose a strong password to secure your account and regain access
              to all features.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-muted-foreground">
                Mix of letters and numbers
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-muted-foreground">
                Include special characters
              </span>
            </div>
          </div>
        </div>
      }
    >
      <AuthForm type="reset-password" />
    </AuthLayout>
  );
}
