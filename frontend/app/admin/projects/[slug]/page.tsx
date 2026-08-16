"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    year: "",
    category: "",
    featured: false,
  });

  useEffect(() => {
    async function loadProject() {
      try {
        const token = localStorage.getItem("air_admin_token");

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/projects/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load project");
        }

        const data: Project = await response.json();

        setProject(data);

        setForm({
          name: data.name || "",
          description: data.description || "",
          location: data.location || "",
          year: data.year?.toString() || "",
          category: data.category || "",
          featured: data.featured,
        });
      } catch (error) {
        console.error(error);
        setMessage("Unable to load project.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug, router]);

  function updateField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("air_admin_token");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/projects/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          location: form.location || null,
          year: form.year ? Number(form.year) : null,
          category: form.category || null,
          featured: form.featured,
        }),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(data?.message || "Failed to update project");
      }

      const updated: Project = await response.json();

      setProject(updated);

      setForm({
        name: updated.name || "",
        description: updated.description || "",
        location: updated.location || "",
        year: updated.year?.toString() || "",
        category: updated.category || "",
        featured: updated.featured,
      });

      setMessage("Changes saved successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Failed to save changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${project?.name}"?\n\nThis will permanently remove the project and its stored VR files.`,
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("air_admin_token");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/projects/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(data?.message || "Failed to delete project");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Failed to delete project.",
      );

      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="text-[11px] tracking-[0.25em] uppercase text-[#8b6840]">
          Loading project
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="text-center">
          <p className="font-[var(--font-heading)] text-4xl">
            Project not found.
          </p>

          <Link
            href="/admin/dashboard"
            className="inline-block mt-6 text-xs tracking-[0.2em] uppercase border-b border-black pb-1"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[246px] shrink-0 bg-[#111] text-white flex-col">
          <div className="px-7 pt-9 pb-8 border-b border-white/10">
            <div className="text-[12px] tracking-[0.28em]">AIR INNOVATION</div>

            <div className="mt-2 text-[9px] tracking-[0.28em] uppercase text-white/35">
              Administration
            </div>
          </div>

          <div className="px-4 pt-8">
            <div className="px-3 mb-4 text-[9px] tracking-[0.25em] uppercase text-white/30">
              Workspace
            </div>

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-3 text-sm text-white/75 hover:text-white hover:bg-white/5 transition"
            >
              <span className="text-lg">←</span>
              Projects
            </Link>

            <a
              href={`${API_URL}/projects/${project.slug}/`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-3 py-3 text-sm text-white/75 hover:text-white hover:bg-white/5 transition"
            >
              <span>↗</span>
              View website
            </a>
          </div>

          <div className="mt-auto p-5 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-white/15 flex items-center justify-center">
                <span className="text-xs">S</span>
              </div>

              <div>
                <div className="text-xs">Sharjil Siddiqui</div>

                <div className="text-[9px] text-white/35 mt-1">
                  Administrator
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.replace("/admin/login");
              }}
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-14">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Link
                  href="/admin/dashboard"
                  className="text-[10px] tracking-[0.2em] uppercase text-[#8b6840] hover:text-[#111] transition"
                >
                  ← Back to projects
                </Link>

                <div className="mt-8 text-[10px] tracking-[0.25em] uppercase text-[#8b6840]">
                  Project editor
                </div>

                <h1 className="mt-2 font-[var(--font-heading)] text-5xl md:text-6xl font-normal">
                  {project.name}.
                </h1>

                <p className="mt-4 text-sm text-[#777]">
                  Edit project information and manage the immersive experience.
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`${API_URL}/projects/${project.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border border-[#dcd9d2] text-[10px] tracking-[0.18em] uppercase hover:bg-white transition"
                >
                  View experience ↗
                </a>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-[#111] text-white text-[10px] tracking-[0.18em] uppercase disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>

            <div className="mt-12 border-t border-[#dedbd4]" />

            {/* Main editor */}
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 mt-10">
              {/* Preview */}
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#999] mb-4">
                  Experience preview
                </div>

                <div className="relative aspect-[16/10] bg-[#dededc] overflow-hidden border border-[#dedbd4]">
                  <iframe
                    src={`${API_URL}/projects/${project.slug}/`}
                    title={`${project.name} preview`}
                    className="absolute inset-0 w-full h-full"
                  />

                  <div className="absolute top-4 left-4 bg-[#111]/80 text-white px-3 py-2 text-[9px] tracking-[0.15em] uppercase">
                    Live preview
                  </div>
                </div>

                {/* Project technical info */}
                <div className="mt-8 border-t border-[#dedbd4]">
                  <div className="grid grid-cols-2 md:grid-cols-3">
                    <InfoItem label="Slug" value={project.slug} />

                    <InfoItem label="Entry file" value={project.entryFile} />

                    <InfoItem label="Storage" value={project.projectPath} />
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white border border-[#dedbd4]">
                <div className="px-7 py-6 border-b border-[#dedbd4]">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#8b6840]">
                    Project information
                  </div>
                </div>

                <div className="p-7 space-y-6">
                  <Field
                    label="Project name"
                    value={form.name}
                    onChange={(value) => updateField("name", value)}
                  />

                  <Field
                    label="Location"
                    value={form.location}
                    onChange={(value) => updateField("location", value)}
                  />

                  <div className="grid grid-cols-2 gap-5">
                    <Field
                      label="Year"
                      type="number"
                      value={form.year}
                      onChange={(value) => updateField("year", value)}
                    />

                    <Field
                      label="Category"
                      value={form.category}
                      onChange={(value) => updateField("category", value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-[#999] mb-2">
                      Description
                    </label>

                    <textarea
                      value={form.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      rows={6}
                      className="w-full resize-none border border-[#dedbd4] bg-[#faf9f7] px-4 py-3 text-sm outline-none focus:border-[#8b6840] transition"
                      placeholder="Describe the project..."
                    />
                  </div>

                  {/* Featured */}
                  <div className="pt-3 border-t border-[#dedbd4]">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="text-sm">Featured project</div>

                        <div className="text-xs text-[#999] mt-1">
                          Show this project in featured areas.
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateField("featured", !form.featured)}
                        className={`relative w-11 h-6 transition ${
                          form.featured ? "bg-[#111]" : "bg-[#d5d3ce]"
                        }`}
                        aria-label="Toggle featured"
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white transition ${
                            form.featured ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* VR files */}
            <section className="mt-14">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#8b6840]">
                    Immersive experience
                  </div>

                  <h2 className="mt-2 font-[var(--font-heading)] text-3xl">
                    VR project files
                  </h2>

                  <p className="mt-2 text-sm text-[#777]">
                    Manage the files powering this interactive experience.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-px bg-[#dedbd4] border border-[#dedbd4]">
                <TechnicalCard label="Project" value={project.slug} />

                <TechnicalCard label="Entry" value={project.entryFile} />

                <TechnicalCard
                  label="Storage path"
                  value={project.projectPath}
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  disabled
                  className="px-6 py-3 border border-[#dedbd4] text-[10px] tracking-[0.18em] uppercase text-[#aaa] cursor-not-allowed"
                >
                  Replace VR project
                </button>

                <div className="flex items-center text-xs text-[#999]">
                  File replacement endpoint is ready on the backend; upload UI
                  comes next.
                </div>
              </div>
            </section>

            {/* Danger zone */}
            <section className="mt-16 pt-8 border-t border-[#d8d5ce]">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#a33]">
                Danger zone
              </div>

              <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 border border-[#e3d4d4] bg-[#fffafa] p-6">
                <div>
                  <div className="text-sm">Delete this project</div>

                  <p className="text-xs text-[#888] mt-1">
                    Permanently removes the project and its VR files from
                    storage.
                  </p>
                </div>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-5 py-3 border border-[#b77] text-[#a33] text-[10px] tracking-[0.18em] uppercase hover:bg-[#a33] hover:text-white transition disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete project"}
                </button>
              </div>
            </section>

            {/* Status */}
            {message && (
              <div
                className={`fixed bottom-6 right-6 px-5 py-4 bg-[#111] text-white text-xs shadow-xl ${
                  message.toLowerCase().includes("success") ? "" : ""
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[9px] tracking-[0.2em] uppercase text-[#999] mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[#dedbd4] bg-[#faf9f7] px-4 py-3 text-sm outline-none focus:border-[#8b6840] transition"
      />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-5 border-r border-b border-[#dedbd4] last:border-r-0">
      <div className="text-[9px] tracking-[0.2em] uppercase text-[#aaa]">
        {label}
      </div>

      <div className="mt-2 text-xs break-all">{value}</div>
    </div>
  );
}

function TechnicalCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f8f7f4] p-6">
      <div className="text-[9px] tracking-[0.2em] uppercase text-[#999]">
        {label}
      </div>

      <div className="mt-3 text-sm break-all">{value}</div>
    </div>
  );
}
