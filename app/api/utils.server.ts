export function parseCookie(cookieString: string): Map<string, string> {
  const cookieMap = new Map<string, string>();
  if (!cookieString) return cookieMap;
  const cookies = cookieString.split("; ");

  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookieMap.set(key, decodeURIComponent(value));
  });

  return cookieMap;
}
