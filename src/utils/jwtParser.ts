export function getUserName(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.uniqueName || null;
  } catch {
    return null;
  }
}
