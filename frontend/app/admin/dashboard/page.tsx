"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderOpen,
  LogOut,
  Plus,
  Star,
  User,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type UserData = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
};

type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  location: string | null;
  year: number | null;
  category: string | null;
  featured: boolean;
  projectPath: string;
  entryFile: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("air_admin_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      try {
        const meResponse = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!meResponse.ok) {
          localStorage.removeItem("air_admin_token");
          localStorage.removeItem("air_admin_user");

          window.location.href = "/admin/login";
          return;
        }

        const meData = await meResponse.json();

        setUser(meData.user);

        const projectsResponse = await fetch(`${API_URL}/api/projects`);

        if (!projectsResponse.ok) {
          throw new Error("Failed to load projects");
        }

        const projectsData = await projectsResponse.json();

        setProjects(projectsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function handleLogout() {
    localStorage.removeItem("air_admin_token");
    localStorage.removeItem("air_admin_user");

    window.location.href = "/admin/login";
  }

  const featuredProjects = projects.filter(
    (project) => project.featured,
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border border-black/10 border-t-[var(--accent)]" />

            <p className="text-xs uppercase tracking-[0.2em] text-black/40">
              Loading workspace
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-red-600">
              Something went wrong
            </p>

            <h1 className="text-4xl">Unable to load workspace.</h1>

            <p className="mt-4 text-sm text-[var(--muted)]">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-8 bg-[#111] px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 bg-[#111] text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-8 py-8">
            <Link href="/">
              <p className="text-xs font-medium uppercase tracking-[0.3em]">
                AIR Innovation
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                Administration
              </p>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-8">
            <p className="mb-4 px-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Workspace
            </p>

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 bg-white/10 px-4 py-3 text-sm"
            >
              <FolderOpen size={17} strokeWidth={1.5} />
              Projects
            </Link>

            <Link
              href="/"
              target="_blank"
              className="mt-1 flex items-center gap-3 px-4 py-3 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowUpRight size={17} strokeWidth={1.5} />
              View website
            </Link>
          </nav>

          <div className="border-t border-white/10 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-white/15">
                <User size={16} strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm">
                  {user?.name || "Administrator"}
                </p>

                <p className="truncate text-[10px] text-white/35">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-1 py-2 text-xs uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white"
            >
              <LogOut size={15} strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5 lg:hidden">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em]">
                AIR Innovation
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/40">
                Administration
              </p>
            </div>

            <button onClick={handleLogout}>
              <LogOut size={18} strokeWidth={1.5} />
            </button>
          </header>

          <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            {/* Header */}
            <div className="flex flex-col justify-between gap-8 border-b border-[var(--border)] pb-10 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--accent-dark)]">
                  Dashboard
                </p>

                <h1 className="text-5xl leading-none sm:text-6xl">Projects.</h1>

                <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--muted)]">
                  Manage your architectural projects and immersive experiences.
                </p>
              </div>

              <Link
                href="/admin/projects/new"
                className="flex h-12 items-center justify-center gap-3 bg-[#111] px-6 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-dark)]"
              >
                <Plus size={17} strokeWidth={1.5} />
                New project
              </Link>
            </div>

            {/* Stats */}
            <div className="grid border-b border-[var(--border)] sm:grid-cols-3">
              <div className="border-b border-[var(--border)] py-8 sm:border-b-0 sm:border-r sm:pr-8">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Total projects
                  </p>

                  <FolderOpen
                    size={17}
                    strokeWidth={1.3}
                    className="text-black/25"
                  />
                </div>

                <p className="mt-4 text-5xl">{projects.length}</p>
              </div>

              <div className="border-b border-[var(--border)] py-8 sm:border-b-0 sm:border-r sm:px-8">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Featured
                  </p>

                  <Star size={17} strokeWidth={1.3} className="text-black/25" />
                </div>

                <p className="mt-4 text-5xl">{featuredProjects}</p>
              </div>

              <div className="py-8 sm:pl-8">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Administrator
                  </p>

                  <User size={17} strokeWidth={1.3} className="text-black/25" />
                </div>

                <p className="mt-4 truncate text-lg">{user?.name || "Admin"}</p>
              </div>
            </div>

            {/* Projects */}
            <div className="pt-12">
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                    Your work
                  </p>

                  <h2 className="mt-2 text-3xl">All projects</h2>
                </div>

                <span className="text-xs text-black/35">
                  {projects.length}{" "}
                  {projects.length === 1 ? "project" : "projects"}
                </span>
              </div>

              {projects.length === 0 ? (
                <div className="border border-dashed border-black/15 px-6 py-20 text-center">
                  <FolderOpen
                    size={30}
                    strokeWidth={1}
                    className="mx-auto text-black/25"
                  />

                  <h3 className="mt-5 text-3xl">No projects yet.</h3>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/45">
                    Create your first project to start building your portfolio.
                  </p>

                  <Link
                    href="/admin/projects/new"
                    className="mt-7 inline-flex items-center gap-2 bg-[#111] px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
                  >
                    <Plus size={15} />
                    Create project
                  </Link>
                </div>
              ) : (
                <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/admin/projects/${project.slug}`}
                      className="group bg-[var(--background)] p-6 transition-colors hover:bg-white sm:p-7"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">
                          {project.category || "Project"}
                        </span>

                        {project.featured && (
                          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-[var(--accent-dark)]">
                            <Star size={11} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="mt-16 text-3xl leading-tight transition-transform duration-300 group-hover:translate-x-1">
                        {project.name}
                      </h3>

                      <div className="mt-6 space-y-2 text-xs text-black/45">
                        {project.location && <p>{project.location}</p>}

                        {project.year && <p>{project.year}</p>}
                      </div>

                      <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-[9px] uppercase tracking-[0.18em] text-black/30">
                          {project.slug}
                        </span>

                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.4}
                          className="text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
