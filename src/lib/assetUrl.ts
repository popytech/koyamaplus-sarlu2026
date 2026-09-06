export function assetUrl(path?: string): string {
  if (!path) return '';
  // Ensure leading slash preserved, encode path but keep slashes
  return path
    .split('/')
    .map(encodeURIComponent)
    .join('/');
}

export default assetUrl;
