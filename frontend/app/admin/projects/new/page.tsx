"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const categories = [
  "Architecture",
  "Interior Design",
  "Architectural Visualization",
  "Residential",
  "Commercial",
  "Hospitality",
  "Other",
];

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState("Architectural Visualization");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      setError("Please upload a ZIP file containing the VR experience.");
      event.target.value = "";
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!file) {
      setError("Please upload the VR project ZIP.");
      return;
    }

    const token = localStorage.getItem("air_admin_token");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsCreating(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("location", location);
      formData.append("year", year);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("featured", String(featured));
      formData.append("files", file);

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("air_admin_token");
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Failed to create project.",
        );
      }

      if (!data.slug) {
        throw new Error(
          "Project was created but no project slug was returned.",
        );
      }

      router.push(`/admin/projects/${data.slug}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the project.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#111]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-[#e5e3df] bg-[#111] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-7 py-7">
          <div className="text-[12px] tracking-[0.32em]">AIR INNOVATION</div>

          <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-white/35">
            Administration
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="mb-4 px-3 text-[9px] uppercase tracking-[0.28em] text-white/25">
            Workspace
          </div>

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 bg-white/10 px-3 py-3 text-[12px] tracking-wide"
          >
            <span className="text-white/60">←</span>
            <span>Projects</span>
          </Link>

          <Link
            href="/"
            className="mt-1 flex items-center gap-3 px-3 py-3 text-[12px] text-white/45 transition hover:text-white"
          >
            <span>↗</span>
            <span>View website</span>
          </Link>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-white/20 text-[11px]">
              S
            </div>

            <div>
              <div className="text-[12px]">Sharjil Siddiqui</div>
              <div className="mt-1 text-[9px] text-white/35">
                sharjilsidd187@gmail.com
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("air_admin_token");
              localStorage.removeItem("air_admin_user");
              router.replace("/admin/login");
            }}
            className="mt-6 text-[10px] uppercase tracking-[0.25em] text-white/40 transition hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-[248px]">
        <div className="mx-auto max-w-[1180px] px-8 py-12 lg:px-12">
          {/* Header */}
          <div className="border-b border-[#dedbd5] pb-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#a0784e]">
                  New project
                </div>

                <h1 className="font-[var(--font-heading)] text-[56px] leading-[0.95] tracking-[-0.04em]">
                  Create.
                </h1>

                <p className="mt-5 max-w-[520px] text-[13px] leading-6 text-[#707070]">
                  Add a new architectural project and immersive experience to
                  your private workspace.
                </p>
              </div>

              <Link
                href="/admin/dashboard"
                className="inline-flex h-[42px] items-center justify-center border border-[#d9d6d0] px-6 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white"
              >
                ← Back to projects
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-10 py-10 lg:grid-cols-[1fr_390px]">
              {/* Main information */}
              <section>
                <div className="mb-7">
                  <div className="text-[9px] uppercase tracking-[0.28em] text-[#a0784e]">
                    Project information
                  </div>

                  <h2 className="mt-3 font-[var(--font-heading)] text-[30px]">
                    Tell us about the project.
                  </h2>
                </div>

                <div className="space-y-7">
                  <Field label="Project name">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. AIR Residence"
                      className="admin-input"
                    />
                  </Field>

                  <Field label="Location">
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai, India"
                      className="admin-input"
                    />
                  </Field>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Year">
                      <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="admin-input"
                      />
                    </Field>

                    <Field label="Category">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="admin-input appearance-none"
                      >
                        {categories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the project and its architectural concept..."
                      rows={7}
                      className="admin-input resize-none"
                    />
                  </Field>

                  <div className="border-t border-[#e2dfda] pt-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[12px]">Featured project</div>

                        <div className="mt-1 text-[11px] leading-5 text-[#858585]">
                          Show this project in featured areas of the website.
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFeatured((value) => !value)}
                        className={`relative h-[28px] w-[52px] transition ${
                          featured ? "bg-[#111]" : "bg-[#d5d3cf]"
                        }`}
                        aria-label="Toggle featured project"
                      >
                        <span
                          className={`absolute top-[4px] h-[20px] w-[20px] bg-white transition ${
                            featured ? "left-[28px]" : "left-[4px]"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Upload */}
              <section>
                <div className="mb-7">
                  <div className="text-[9px] uppercase tracking-[0.28em] text-[#a0784e]">
                    Immersive experience
                  </div>

                  <h2 className="mt-3 font-[var(--font-heading)] text-[30px]">
                    Add the VR project.
                  </h2>

                  <p className="mt-3 text-[12px] leading-5 text-[#777]">
                    Upload the complete exported VR experience as a single ZIP
                    file.
                  </p>
                </div>

                <label
                  htmlFor="vr-project"
                  className={`group flex min-h-[330px] cursor-pointer flex-col items-center justify-center border border-dashed px-8 text-center transition ${
                    file
                      ? "border-[#a0784e] bg-white"
                      : "border-[#cfcac2] bg-[#f4f2ee] hover:border-[#111]"
                  }`}
                >
                  <input
                    id="vr-project"
                    type="file"
                    accept=".zip,application/zip"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {file ? (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center border border-[#dedbd5] bg-white text-[11px]">
                        ZIP
                      </div>

                      <div className="mt-6 max-w-[270px] break-all text-[13px]">
                        {file.name}
                      </div>

                      <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#999]">
                        {formatFileSize(file.size)}
                      </div>

                      <div className="mt-7 text-[10px] uppercase tracking-[0.2em] text-[#a0784e]">
                        Click to replace
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center border border-[#d9d5ce] bg-white text-[20px]">
                        ↑
                      </div>

                      <div className="mt-6 text-[13px]">
                        Upload VR experience
                      </div>

                      <div className="mt-2 max-w-[250px] text-[11px] leading-5 text-[#888]">
                        Choose a ZIP containing your HTML, JavaScript, media and
                        VR assets.
                      </div>

                      <div className="mt-6 border border-[#d7d3cc] bg-white px-5 py-3 text-[9px] uppercase tracking-[0.2em]">
                        Choose file
                      </div>
                    </>
                  )}
                </label>

                <div className="mt-5 border border-[#e2dfda] bg-white p-5">
                  <div className="text-[9px] uppercase tracking-[0.22em] text-[#999]">
                    Required
                  </div>

                  <ul className="mt-4 space-y-2 text-[11px] leading-5 text-[#666]">
                    <li>• ZIP format</li>
                    <li>• Must contain an index.html</li>
                    <li>• Include all VR assets and media</li>
                    <li>• The backend handles extraction</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-[12px] text-red-700">
                {error}
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-[#dedbd5] py-7 sm:flex-row sm:items-center">
              <Link
                href="/admin/dashboard"
                className="text-center text-[10px] uppercase tracking-[0.2em] text-[#777] transition hover:text-[#111] sm:text-left"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isCreating}
                className="h-[50px] bg-[#111] px-8 text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating ? "Creating project..." : "Create project  →"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          border: 1px solid #dedbd5;
          background: #ffffff;
          padding: 14px 15px;
          font-size: 13px;
          outline: none;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease;
        }

        .admin-input::placeholder {
          color: #aaa;
        }

        .admin-input:focus {
          border-color: #111111;
          box-shadow: 0 0 0 1px #111111;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] uppercase tracking-[0.22em] text-[#999]">
        {label}
      </label>

      {children}
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
