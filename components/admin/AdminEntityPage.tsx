"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAdminEntity, type AdminField } from "@/lib/admin";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

interface AdminEntityPageProps {
  table: string;
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

export default function AdminEntityPage({ table }: AdminEntityPageProps) {
  const entity = getAdminEntity(table);
  const [items, setItems] = useState<RecordData[]>([]);
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const fieldSpecs = useMemo(() => entity?.fields ?? [], [entity]);

  const initializeForm = useCallback(() => {
    if (!entity) return;
    setFormData(createEmptyForm(entity.fields));
    setSelectedId(null);
    setMessage("");
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
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-slate-900 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-500">Not found</p>
        <h1 className="mt-4 text-3xl font-semibold">Table not recognized</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">The selected admin path does not match a known table. Please use the sidebar links.</p>
        <Link href="/admin" className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || errorData?.error || `Request failed with status ${response.status}`);
      }

      setMessage(selectedId ? "Record updated successfully." : "Record created successfully.");
      setSelectedId(null);
      setFormData(createEmptyForm(entity.fields));
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
  };

  const apiBasePath = `/api/${entity.slug}`;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-600">{entity.label}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Manage {entity.label}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">All CRUD operations are wired to <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{apiBasePath}</code>.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin" className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Back to dashboard
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset form
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Data list</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{entity.label}</h2>
              </div>
              <button
                type="button"
                onClick={loadItems}
                className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Refresh
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              {loading ? (
                <div className="p-8 text-center text-slate-600">Loading...</div>
              ) : items.length === 0 ? (
                <div className="p-8 text-center text-slate-600">No data available yet. Create a record above.</div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <div key={`item-${item.id ?? JSON.stringify(item)}`} className="grid grid-cols-[1fr_auto] gap-4 bg-white px-4 py-4 sm:px-6">
                      <div>
                        <p className="font-medium text-slate-900">{String(item[entity.fields[0].name] ?? `Record ${item.id ?? ""}`)}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {entity.fields.slice(1, 4).map((field) => `${formatFieldLabel(field.name)}: ${String(item[field.name] ?? "—")}`).join(" • ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
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

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Form</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create or update a record</h2>
              </div>
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
                API-ready
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {fieldSpecs.map((field) => {
                if (field.name === "latitude" || field.name === "longitude") return null;
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
                  <div key={field.name} className="grid gap-2">
                    <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        {...commonProps}
                        rows={3}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
                      />
                    ) : field.type === "checkbox" ? (
                      <label className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition hover:border-slate-300">
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(event) => handleInputChange(field.name, event.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <span>{field.label}</span>
                      </label>
                    ) : field.type === "select" ? (
                      <select
                        {...commonProps}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "map" ? (
                      <MapPicker
                        latitude={formData.latitude ? Number(formData.latitude) : undefined}
                        longitude={formData.longitude ? Number(formData.longitude) : undefined}
                        onChange={(lat, lng) => {
                          handleInputChange("latitude", String(lat));
                          handleInputChange("longitude", String(lng));
                        }}
                      />
                    ) : (
                      <input
                        {...commonProps}
                        type={field.type}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
                      />
                    )}
                  </div>
                );
              })}

              {/* Render MapPicker explicitly if the entity has latitude/longitude fields */}
              {fieldSpecs.some((f) => f.name === "latitude") && fieldSpecs.some((f) => f.name === "longitude") && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Location (Pin on map)</label>
                  <MapPicker
                    latitude={formData.latitude ? Number(formData.latitude) : undefined}
                    longitude={formData.longitude ? Number(formData.longitude) : undefined}
                    onChange={(lat, lng) => {
                      handleInputChange("latitude", String(lat));
                      handleInputChange("longitude", String(lng));
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-600">Submit the form to POST or PUT to your API. Use the row actions to load a record for update or delete.</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {selectedId ? "Update record" : "Create record"}
                  </button>
                </div>
              </div>

              {message ? (
                <div className="rounded-3xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
                  {message}
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
