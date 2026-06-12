import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "yb_admin";

function password(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** Session cookie value, derived from the admin password — changing the
 *  password invalidates every existing session. */
export function sessionToken(): string {
  return crypto
    .createHmac("sha256", password())
    .update("yb-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkPassword(input: string): boolean {
  return password() !== "" && safeEqual(input, password());
}

export async function isAdmin(): Promise<boolean> {
  if (!password()) return false;
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value ?? "";
  return token !== "" && safeEqual(token, sessionToken());
}

/** Call at the top of every admin page/action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
