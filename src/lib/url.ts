export function withBase(path = "/") {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, "");

  return cleanPath ? `${base}${cleanPath}` : base;
}

export function absoluteUrl(path: string, site: URL | undefined) {
  if (!site) {
    return path;
  }

  return new URL(withBase(path), site).toString();
}
