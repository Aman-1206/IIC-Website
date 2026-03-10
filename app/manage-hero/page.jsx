"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Save, Trash2 } from "lucide-react";

const DEFAULT_IMAGE = "/assets/hero.png";
const MAX_EXTRA_SLIDES = 4;

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function createEmptySlide() {
  return {
    desktopImage: "",
    mobileImage: "",
  };
}

function normalizeSlides(slides, legacyImages = []) {
  if (Array.isArray(slides) && slides.length > 0) {
    return slides.map((slide) => ({
      desktopImage: slide?.desktopImage || "",
      mobileImage: slide?.mobileImage || "",
    }));
  }

  if (Array.isArray(legacyImages) && legacyImages.length > 0) {
    return legacyImages.map((url) => ({
      desktopImage: url || "",
      mobileImage: "",
    }));
  }

  return [];
}

export default function ManageHeroPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { edgestore } = useEdgeStore();

  const canEdit = useMemo(() => {
    const role = session?.user?.role;
    return role === "Admin" || role === "Moderator";
  }, [session]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [autoplayMs, setAutoplayMs] = useState(4500);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin");
  }, [status, router]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/homepage/hero");
        const data = await res.json();
        if (cancelled) return;
        setEnabled(Boolean(data?.enabled));
        setAutoplayMs(typeof data?.autoplayMs === "number" ? data.autoplayMs : 4500);
        setSlides(normalizeSlides(data?.slides, data?.images));
      } catch {
        toast.error("Failed to load hero settings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const moveSlide = (from, to) => {
    setSlides((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const removeSlide = (idx) => {
    setSlides((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSlide = () => {
    if (slides.length >= MAX_EXTRA_SLIDES) {
      toast.error("Maximum 5 slides reached (default + 4). Remove a slide first.");
      return;
    }
    setSlides((prev) => [...prev, createEmptySlide()]);
  };

  const uploadImage = async (file, idx, field) => {
    if (!file) return;

    try {
      setUploading(true);
      const res = await edgestore.publicFiles.upload({ file });
      setSlides((prev) =>
        prev.map((slide, slideIdx) =>
          slideIdx === idx ? { ...slide, [field]: res.url } : slide
        )
      );
      toast.success(field === "mobileImage" ? "Mobile image uploaded." : "Desktop image uploaded.");
    } catch (e) {
      console.error(e);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearMobileImage = (idx) => {
    setSlides((prev) =>
      prev.map((slide, slideIdx) =>
        slideIdx === idx ? { ...slide, mobileImage: "" } : slide
      )
    );
  };

  const save = async () => {
    if (!canEdit) return toast.error("You don't have permission to update hero settings.");

    const incompleteSlide = slides.some((slide) => !slide.desktopImage && slide.mobileImage);
    if (incompleteSlide) {
      return toast.error("Upload a desktop image before adding a mobile-only image.");
    }

    const normalized = slides
      .map((slide) => ({
        desktopImage: typeof slide?.desktopImage === "string" ? slide.desktopImage.trim() : "",
        mobileImage: typeof slide?.mobileImage === "string" ? slide.mobileImage.trim() : "",
      }))
      .filter((slide) => slide.desktopImage);

    if (enabled && normalized.length < 2) {
      return toast.error("When slider is enabled, add at least 2 extra images (3 total with default).");
    }

    try {
      setSaving(true);
      const res = await fetch("/api/homepage/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled,
          autoplayMs: clamp(Number(autoplayMs) || 4500, 2000, 10000),
          slides: normalized,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      setEnabled(Boolean(data?.enabled));
      setAutoplayMs(data?.autoplayMs ?? 4500);
      setSlides(normalizeSlides(data?.slides, data?.images));
      toast.success("Hero settings saved.");
    } catch (e) {
      toast.error(e?.message || "Could not save hero settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading...
      </div>
    );
  }

  const savedSlideCount = slides.filter((slide) => slide.desktopImage).length;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#08246A]">Homepage Hero Slider</h1>
            <p className="text-sm text-gray-600 mt-1">
              Default hero image stays. Add 2-4 extra slides to make 3-5 slides.
            </p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <Button variant="outline" onClick={() => router.push("/admin")} className="flex-1 sm:flex-none">
              Back
            </Button>
            <Button onClick={save} disabled={saving || uploading || !canEdit} className="flex-1 sm:flex-none">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Settings</h2>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="h-4 w-4"
                />
                Enable slider
              </label>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Autoplay (ms)</label>
              <input
                type="number"
                min={2000}
                max={10000}
                value={autoplayMs}
                onChange={(e) => setAutoplayMs(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 3500-5500ms</p>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700">Extra hero slides</label>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  onClick={addSlide}
                  disabled={uploading || slides.length >= MAX_EXTRA_SLIDES}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ImagePlus className="h-4 w-4" />
                  <span className="text-sm">Add slide</span>
                </button>
                {uploading && (
                  <span className="text-sm text-gray-600 inline-flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Desktop image is required. Mobile image is optional and only used on phones.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm font-semibold text-blue-900">Image size guide</p>
              <div className="mt-2 space-y-1 text-xs text-blue-900/90">
                <p>
                  Desktop recommended: <span className="font-semibold">2000 x 1000 px</span>
                </p>
                <p>
                  Mobile recommended: <span className="font-semibold">900 x 1400 px</span>
                </p>
                <p>
                  Desktop slides should stay landscape for large screens.
                </p>
                <p>Leave mobile blank to keep using the desktop banner on phones.</p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-gray-800">Slides order</h2>

            <div className="mt-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border bg-gray-50">
                <div className="h-14 w-20 rounded-lg overflow-hidden bg-white border shrink-0">
                  <img src={DEFAULT_IMAGE} alt="Default hero" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">Default hero image</p>
                  <p className="text-xs text-gray-500 break-all">{DEFAULT_IMAGE}</p>
                </div>
                <span className="text-xs text-gray-600">Always included</span>
              </div>

              {slides.length === 0 ? (
                <div className="text-sm text-gray-600 p-4 border rounded-xl">
                  No extra slides yet. Add 2-4 slides to enable a 3-5 image slider.
                </div>
              ) : (
                slides.map((slide, idx) => (
                  <div key={`${slide.desktopImage || "empty"}-${idx}`} className="rounded-xl border p-3 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">Slide {idx + 2}</p>
                        <p className="text-xs text-gray-500">
                          Desktop image required. Mobile image optional.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveSlide(idx, idx - 1)}
                          disabled={idx === 0}
                          aria-label="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveSlide(idx, idx + 1)}
                          disabled={idx === slides.length - 1}
                          aria-label="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSlide(idx)}
                          aria-label="Delete slide"
                          title="Delete slide"
                          className="px-3 border-red-600 bg-red-600 text-white hover:bg-red-700 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2 min-w-0">
                      <div className="rounded-xl border p-3 bg-gray-50 min-w-0">
                        <div className="h-28 w-full rounded-lg overflow-hidden bg-white border">
                          {slide.desktopImage ? (
                            <img
                              src={slide.desktopImage}
                              alt={`Desktop slide ${idx + 2}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                              No desktop image
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs font-medium text-gray-700">Desktop image</p>
                        <p className="text-xs text-gray-500 break-all min-h-4">
                          {slide.desktopImage || "Required"}
                        </p>
                        <label className="mt-3 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-white text-sm">
                          <ImagePlus className="h-4 w-4" />
                          Upload desktop
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => uploadImage(e.target.files?.[0], idx, "desktopImage")}
                            disabled={uploading}
                          />
                        </label>
                      </div>

                      <div className="rounded-xl border p-3 bg-gray-50 min-w-0">
                        <div className="h-28 w-full rounded-lg overflow-hidden bg-white border">
                          {slide.mobileImage ? (
                            <img
                              src={slide.mobileImage}
                              alt={`Mobile slide ${idx + 2}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                              Fallback to desktop image
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs font-medium text-gray-700">Mobile image</p>
                        <p className="text-xs text-gray-500 break-all min-h-4">
                          {slide.mobileImage || "Optional"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <label className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-white text-sm">
                            <ImagePlus className="h-4 w-4" />
                            Upload mobile
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => uploadImage(e.target.files?.[0], idx, "mobileImage")}
                              disabled={uploading || !slide.desktopImage}
                            />
                          </label>
                          {slide.mobileImage && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => clearMobileImage(idx)}
                              className="w-full sm:w-auto"
                            >
                              Remove mobile
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-xs text-gray-600">
              Total slides on homepage: <span className="font-semibold">{1 + savedSlideCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
