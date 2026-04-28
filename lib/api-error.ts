/**
 * Extracts a user-readable message from an API error payload.
 * Handles strings, zod's flatten() output, and unknowns gracefully.
 */
export function extractError(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const err = (payload as { error?: unknown }).error;
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    const flat = err as { fieldErrors?: Record<string, string[]>; formErrors?: string[] };
    if (flat.fieldErrors) {
      const first = Object.entries(flat.fieldErrors).find(([, msgs]) => msgs && msgs.length > 0);
      if (first) return `${first[0]}: ${first[1][0]}`;
    }
    if (flat.formErrors && flat.formErrors.length > 0) return flat.formErrors[0];
  }
  return fallback;
}
