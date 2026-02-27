import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-semibold text-sm">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs">
              J
            </div>
            Mission Control
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right — dark gradient panel */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-12">
        <div className="text-center space-y-3">
          <p className="text-4xl font-bold tracking-tight text-white">Mission Control</p>
          <p className="text-zinc-400 text-sm max-w-xs">
            Jarvis command centre. Restricted access.
          </p>
        </div>
        <div className="absolute bottom-6 text-xs text-zinc-600">
          Interstellar Labs
        </div>
      </div>
    </div>
  );
}
