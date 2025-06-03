import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries, we'll send you reset instructions"
      illustration={
        <div className="space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/40 to-orange-500/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Reset Your Password
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">
                  Quick Recovery
                </p>
                <p>
                  Check your email inbox and spam folder for the reset link. The
                  link expires in 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AuthForm type="forgot-password" />
    </AuthLayout>
  );
}
