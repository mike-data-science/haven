"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAdminEntity, type AdminField } from "@/lib/admin";
import dynamic from "next/dynamic";

const UniversalMap = dynamic(() => import("../shared/UniversalMap"), { ssr: false });

interface AdminEntityPageProps {
  table: string;
  categories?: { id: number; name: string }[];
  currentUser?: { id: number; role: string };
}

type RecordData = Record<string, unknown> & { id?: number };

function formatFieldLabel(name: string) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function createEmptyForm(fields: AdminField[]) {
  return fields.reduce<Record<string, string | boolean>>((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
}

export default function AdminEntityPage({ table, categories, currentUser }: AdminEntityPageProps) {
  const entity = getAdminEntity(table);
  const [items, setItems] = useState<RecordData[]>([]);
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);

  const fieldSpecs = useMemo(() => entity?.fields ?? [], [entity]);

  const initializeForm = useCallback(() => {
    if (!entity) return;
    setFormData(createEmptyForm(entity.fields));
    setSelectedId(null);
    setMessage("");
    setSelectedFiles([]);
    setExistingImages([]);
  }, [entity]);

  const loadItems = useCallback(async () => {
    if (!entity) return;
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/${entity.slug}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${entity.slug}`);
      }

      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setMessage(`Unable to load ${entity.label}. Check /api/${entity.slug}.`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [entity]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (!entity) {
    return (
      <div className="mx-auto max-w-3xl rounded-[18px] border border-rose-200 bg-rose-50 p-8 text-center text-slate-900 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-500">Not found</p>
        <h1 className="mt-3 text-xl font-semibold">Table not recognized</h1>
        <p className="mt-2 text-xs leading-7 text-slate-600">The selected admin path does not match a known table. Please use the sidebar links.</p>
        <Link href="/dashboard" className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!entity) return;

    setSaving(true);
    setMessage("");

    try {
      const url = selectedId ? `/api/${entity.slug}/${selectedId}` : `/api/${entity.slug}`;
      const method = selectedId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let savedId = selectedId;
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || errorData?.error || `Request failed with status ${response.status}`);
      } else {
        const savedRecord = await response.json();
        savedId = savedRecord.id;
      }
      
      if (entity.slug === "properties" && selectedFiles.length > 0 && savedId) {
        setMessage(selectedId ? "Property updated. Uploading photos..." : "Property created. Uploading photos...");
        const uploadData = new FormData();
        uploadData.append("propertyId", String(savedId));
        selectedFiles.forEach(file => uploadData.append("files", file));
        
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!uploadRes.ok) {
          throw new Error("Failed to upload photos, but property was saved.");
        }
      }

      setMessage(selectedId ? "Record updated successfully." : "Record created successfully.");
      setSelectedId(null);
      setFormData(createEmptyForm(entity.fields));
      setSelectedFiles([]);
      setExistingImages([]);
      await loadItems();
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : `Save failed. Check /api/${entity.slug} and payload shape.`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: RecordData) => {
    const nextForm: Record<string, string | boolean> = {};
    entity.fields.forEach((field) => {
      const value = item[field.name];
      nextForm[field.name] = typeof value === "boolean" ? value : value?.toString?.() ?? "";
    });

    setFormData(nextForm);
    setSelectedId(item.id ?? null);
    if (entity.slug === "properties" && item.images) {
      setExistingImages(item.images as any[]);
    } else {
      setExistingImages([]);
    }
    setSelectedFiles([]);
    setMessage("Loaded record for editing.");
  };

  const handleDelete = async (id?: number) => {
    if (!entity || id == null) return;
    if (!confirm("Delete this record?")) return;

    setDeletingId(id);
    setMessage("");

    try {
      const response = await fetch(`/api/${entity.slug}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      setMessage("Record deleted successfully.");
      if (selectedId === id) {
        setSelectedId(null);
        setFormData(createEmptyForm(entity.fields));
      }
      await loadItems();
    } catch (error) {
      console.error(error);
      setMessage(`Delete failed. Check /api/${entity.slug}/{id}.`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleReset = () => {
    setFormData(createEmptyForm(entity.fields));
    setSelectedId(null);
    setMessage("");
    setSelectedFiles([]);
    setExistingImages([]);
  };

  const apiBasePath = `/api/${entity.slug}`;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-600">{entity.label}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Manage {entity.label}</h1>
              <p className="mt-2 text-xs leading-7 text-slate-600">All CRUD operations are wired to <code className="rounded bg-slate-100 px-1.5 py-1 text-xs text-slate-700">{apiBasePath}</code>.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/dashboard" className="rounded-3xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
                Back to dashboard
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset form
              </button>
            </div>
          </div>
        </section>

        <section className={`grid gap-5 ${entity.slug === 'properties' ? 'xl:grid-cols-1' : 'xl:grid-cols-[1.05fr_0.95fr]'}`}>
          <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Data list</p>
                <h2 className="mt-1.5 text-lg font-semibold text-slate-900">{entity.label}</h2>
              </div>
              <div className="flex gap-2">
                {entity.slug === 'properties' && (
                  <Link
                    href="/dashboard/properties/new"
                    className="rounded-3xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700"
                  >
                    + New Property
                  </Link>
                )}
                <button
                  type="button"
                  onClick={loadItems}
                  className="rounded-3xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              {loading ? (
                <div className="p-6 text-center text-slate-600">Loading...</div>
              ) : items.length === 0 ? (
                <div className="p-6 text-center text-slate-600">No data available yet. Create a record above.</div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <div key={`item-${item.id ?? JSON.stringify(item)}`} className="grid grid-cols-[1fr_auto] gap-3 bg-white px-3 py-3 sm:px-5">
                      <div>
                        <p className="font-medium text-slate-900 flex items-center gap-1.5">
                          {String(item[entity.fields[0].name] ?? `Record ${item.id ?? ""}`)}
                          {entity.slug === "properties" && Boolean(item.status) && (
                            <span className={`px-1.5 py-0.5 rounded text-[6px] font-bold ${
                              item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                              item.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                              item.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {String(item.status)}
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {entity.fields.slice(1, 4).map((field) => `${formatFieldLabel(field.name)}: ${String(item[field.name] ?? "—")}`).join(" • ")}
                        </p>
                        {entity.slug === "properties" && item.status === "REJECTED" && Boolean(item.rejectionReason) && (
                          <p className="mt-1 text-xs font-semibold text-red-600 flex items-center gap-1">
                            Rejected: {String(item.rejectionReason)}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5">
                        {entity.slug === "properties" && (item.status === "DRAFT" || item.status === "REJECTED") && (
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/properties/${item.id}/submit`, { method: 'POST' });
                                if (res.ok) {
                                  setMessage("Property submitted for review.");
                                  loadItems();
                                }
                              } catch (e) {
                                setMessage("Failed to submit property.");
                              }
                            }}
                            className="rounded-3xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                          >
                            Submit for Review
                          </button>
                        )}
                        {entity.slug === 'properties' ? null : (
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-3xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-3xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          {deletingId === item.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {entity.slug !== 'properties' && (
            <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Form</p>
                <h2 className="mt-1.5 text-lg font-semibold text-slate-900">Create or update a record</h2>
              </div>
              <span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
                API-ready
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              {fieldSpecs.map((field) => {
                if (field.name === "latitude" || field.name === "longitude") return null;
                // Automatically injected by the backend, so we hide it from the form
                if (field.name === "userId") return null;
                // Hide publish toggle from non-admins
                if (field.name === "isPublished" && currentUser?.role !== "ADMIN") return null;
                
                const value = formData[field.name];
                const commonProps = {
                  id: field.name,
                  name: field.name,
                  value: field.type === "checkbox" ? undefined : String(value ?? ""),
                  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                    const nextValue = field.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
                    handleInputChange(field.name, nextValue);
                  },
                  placeholder: field.placeholder ?? field.label,
                };

                return (
                  <div key={field.name} className="grid gap-1.5">
                    <label htmlFor={field.name} className="text-xs font-medium text-slate-700">
                      {field.name === "categoryId" ? "Category" : field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        {...commonProps}
                        rows={3}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-cyan-500"
                      />
                    ) : field.type === "checkbox" ? (
                      <label className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 transition hover:border-slate-300">
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(event) => handleInputChange(field.name, event.target.checked)}
                          className="h-3 w-3 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <span>{field.label}</span>
                      </label>
                    ) : field.name === "categoryId" ? (
                      <select
                        {...commonProps}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-cyan-500"
                      >
                        <option value="">Select a category...</option>
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "select" ? (
                      <select
                        {...commonProps}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-cyan-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "map" ? (
                      <UniversalMap
                        mode="picker"
                        latitude={formData.latitude ? Number(formData.latitude) : undefined}
                        longitude={formData.longitude ? Number(formData.longitude) : undefined}
                        onChange={(lat: number, lng: number) => {
                          handleInputChange("latitude", String(lat));
                          handleInputChange("longitude", String(lng));
                        }}
                        height="100%"
                      />
                    ) : (
                      <input
                        {...commonProps}
                        type={field.type}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-cyan-500"
                      />
                    )}
                  </div>
                );
              })}

              {/* Render MapPicker explicitly if the entity has latitude/longitude fields */}
              {fieldSpecs.some((f) => f.name === "latitude") && fieldSpecs.some((f) => f.name === "longitude") && (
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium text-slate-700">Location (Pin on map)</label>
                  <UniversalMap
                    mode="picker"
                    latitude={formData.latitude ? Number(formData.latitude) : undefined}
                    longitude={formData.longitude ? Number(formData.longitude) : undefined}
                    onChange={(lat: any, lng: any) => {
                      handleInputChange("latitude", String(lat));
                      handleInputChange("longitude", String(lng));
                    }}
                    height="300px"
                  />
                </div>
              )}

              {/* Photos Uploader for Properties */}
              {entity.slug === "properties" && (
                <div className="grid gap-3 mt-5 border-t border-slate-200 pt-5">
                  <div>
                    <label className="text-xs font-medium text-slate-700">Property Photos</label>
                    <p className="text-xs text-slate-500 mb-1.5">Upload multiple images. They will be saved when you submit the form.</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setSelectedFiles(Array.from(e.target.files));
                        }
                      }}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                    />
                  </div>

                  {/* Preview selected files */}
                  {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selectedFiles.map((f, i) => (
                        <div key={i} className="text-xs bg-slate-100 rounded-md px-1.5 py-1 text-slate-600 truncate max-w-28">
                          {f.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Show existing images when editing */}
                  {existingImages.length > 0 && (
                    <div className="mt-1.5">
                      <p className="text-xs font-semibold text-slate-600 mb-1.5">Existing Photos:</p>
                      <div className="flex flex-wrap gap-2">
                        {existingImages.map((img) => (
                          <div key={img.id} className="relative w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                            <img src={img.url} alt={img.alt || "Property"} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-slate-600">Submit the form to POST or PUT to your API. Use the row actions to load a record for update or delete.</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-3xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {selectedId ? "Update record" : "Create record"}
                  </button>
                </div>
              </div>

              {message ? (
                <div className="rounded-3xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs text-cyan-900">
                  {message}
                </div>
              ) : null}
            </form>
          </div>
          )}
        </section>
      </div>
    </main>
  );
}
