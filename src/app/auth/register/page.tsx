import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us today and get started in minutes"
      illustration={
        <div className="space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Start Your Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Create your account and unlock access to powerful features
              designed to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-muted-foreground">Easy Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-muted-foreground">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-muted-foreground">Free Trial</span>
            </div>
          </div>
        </div>
      }
    >
      <AuthForm type="register" />
    </AuthLayout>
  );
}
