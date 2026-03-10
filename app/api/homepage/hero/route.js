import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HomepageHero from "@/models/HomepageHero";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const DEFAULTS = {
  enabled: false,
  images: [],
  slides: [],
  autoplayMs: 4500,
};

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  const cleaned = images
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean)
    .filter((u) => u.startsWith("https://") || u.startsWith("http://"));

  // de-dupe while preserving order
  const seen = new Set();
  const unique = [];
  for (const u of cleaned) {
    if (seen.has(u)) continue;
    seen.add(u);
    unique.push(u);
  }
  return unique;
}

function normalizeSlide(slide) {
  if (!slide || typeof slide !== "object") return null;

  const desktopImage =
    typeof slide.desktopImage === "string" ? slide.desktopImage.trim() : "";
  const mobileImage =
    typeof slide.mobileImage === "string" ? slide.mobileImage.trim() : "";

  const validDesktop =
    desktopImage.startsWith("https://") || desktopImage.startsWith("http://")
      ? desktopImage
      : "";
  const validMobile =
    mobileImage.startsWith("https://") || mobileImage.startsWith("http://")
      ? mobileImage
      : "";

  if (!validDesktop) return null;
  return {
    desktopImage: validDesktop,
    mobileImage: validMobile,
  };
}

function normalizeSlides(slides, legacyImages = []) {
  if (Array.isArray(slides) && slides.length > 0) {
    const cleaned = slides.map(normalizeSlide).filter(Boolean);

    const seen = new Set();
    const unique = [];
    for (const slide of cleaned) {
      const key = `${slide.desktopImage}::${slide.mobileImage}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(slide);
    }
    return unique;
  }

  return normalizeImages(legacyImages).map((desktopImage) => ({
    desktopImage,
    mobileImage: "",
  }));
}

export async function GET() {
  await dbConnect();
  const doc = await HomepageHero.findOne({ key: "singleton" }).lean();
  if (!doc) return NextResponse.json(DEFAULTS);

  const slides = normalizeSlides(doc.slides, doc.images).slice(0, 4);

  return NextResponse.json({
    enabled: Boolean(doc.enabled),
    images: slides.map((slide) => slide.desktopImage),
    slides,
    autoplayMs: typeof doc.autoplayMs === "number" ? doc.autoplayMs : DEFAULTS.autoplayMs,
  });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const authorizedRoles = ["Admin", "Moderator"];
  if (!session || !authorizedRoles.includes(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();
  const body = await req.json();

  const enabled = Boolean(body?.enabled);
  const slides = normalizeSlides(body?.slides, body?.images).slice(0, 4);
  const images = slides.map((slide) => slide.desktopImage);

  const autoplayMsRaw = Number(body?.autoplayMs);
  const autoplayMs = Number.isFinite(autoplayMsRaw)
    ? clamp(Math.round(autoplayMsRaw), 2000, 10000)
    : DEFAULTS.autoplayMs;

  if (enabled && slides.length < 2) {
    return NextResponse.json(
      { error: "When slider is enabled, please add at least 2 extra images (3 total with default)." },
      { status: 400 }
    );
  }

  const updated = await HomepageHero.findOneAndUpdate(
    { key: "singleton" },
    { key: "singleton", enabled, images, slides, autoplayMs },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  const normalizedSlides = normalizeSlides(updated.slides, updated.images).slice(0, 4);

  return NextResponse.json({
    enabled: Boolean(updated.enabled),
    images: normalizedSlides.map((slide) => slide.desktopImage),
    slides: normalizedSlides,
    autoplayMs: typeof updated.autoplayMs === "number" ? updated.autoplayMs : DEFAULTS.autoplayMs,
  });
}

