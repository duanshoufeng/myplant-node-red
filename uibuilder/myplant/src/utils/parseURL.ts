export default function parseURL() {
  const query = location.hash.slice(1).toLowerCase() || "/";
  const url: string = query.split("?")[0] ?? "";
  const params = new URLSearchParams(query.split("?")[1]);
  return { url, params };
}
