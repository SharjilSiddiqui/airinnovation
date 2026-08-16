import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden bg-[#111111] lg:flex">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                AIR Innovation
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                Private Workspace
              </p>

              <h1 className="max-w-xl text-6xl leading-[0.95] text-white xl:text-7xl">
                Shape the
                <br />
                experience.
              </h1>

              <p className="mt-8 max-w-md text-sm leading-7 text-white/50">
                Manage architectural projects, immersive experiences and digital
                environments from your private workspace.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/30">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Administration
            </div>
          </div>
        </div>

        {/* Login panel */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-12 lg:hidden">
              <p className="text-xs font-medium uppercase tracking-[0.3em]">
                AIR Innovation
              </p>
            </div>

            <div className="mb-10">
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--accent-dark)]">
                Admin Portal
              </p>

              <h2 className="text-5xl leading-none sm:text-6xl">
                Welcome back.
              </h2>

              <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                Sign in to manage your projects and immersive experiences.
              </p>
            </div>

            <AdminLoginForm />

            <div className="mt-10 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--border)]" />

              <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">
                AIR
              </span>

              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
