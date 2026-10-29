// Adds the site's base path (used when the site is served from a sub-folder, such as the GitHub Pages preview).
// On the real site the base is "/", so links stay exactly as written.
export const u = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? base + path : path;
};
