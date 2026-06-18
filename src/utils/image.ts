const getCdnHost = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";
  // Check if API url or hostname indicates a development/staging environment
  const isDev =
    apiUrl.includes("dev") ||
    apiUrl.includes("localhost") ||
    apiUrl.includes("127.0.0.1") ||
    (typeof window !== "undefined" && window.location.hostname !== "admin.makeittakeit.kr");

  return isDev ? "image-dev.makeittakeit.kr" : "image.makeittakeit.kr";
};

export const IMAGE_CDN_URL = `https://${getCdnHost()}`;

/**
 * Returns the full CDN URL of the given path.
 * If the path is already a full URL, it returns it as is.
 */
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_CDN_URL}/${path}`;
};

/**
 * Strips the domain/CDN host from the URL to extract a clean relative path.
 */
export const getRelativePath = (url: string | null | undefined): string => {
  if (!url) return "";
  if (!url.startsWith("http://") && !url.startsWith("https://")) return url;
  try {
    const parsed = new URL(url);
    let path = parsed.pathname;
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    // Remove bucket name prefix "miti/" if it exists (e.g. from raw storage URLs)
    if (path.startsWith("miti/")) {
      path = path.slice(5);
    }
    return path;
  } catch (e) {
    const match = url.match(/^https?:\/\/[^\/]+\/(.+)$/);
    let path = match ? match[1] : url;
    if (path.startsWith("miti/")) {
      path = path.slice(5);
    }
    return path;
  }
};

/**
 * Inline SVG placeholders to avoid connection closed errors of external placeholder services.
 */
export const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='14'>Image Load Failed</text></svg>";

export const NO_IMAGE_FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='48' viewBox='0 0 64 48'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2352525b' font-family='sans-serif' font-size='10'>No Image</text></svg>";

export const AVATAR_FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='100%' height='100%' fill='%2327272a'/><path d='M40 18a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-24 44c0-10 16-12 24-12s24 2 24 12v4H16v-4z' fill='%2371717a'/></svg>";
