import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin">
      <header className="admin-head">
        <Link href="/admin" className="logo">
          B<span className="dot">.</span>{" "}
          <span className="admin-tag">ADMIN</span>
        </Link>
        <nav className="admin-nav">
          <Link href="/admin">Projects</Link>
          <Link href="/admin/services">Services</Link>
          <Link href="/admin/inbox">Inbox</Link>
          <Link href="/" target="_blank">
            View site ↗
          </Link>
          <form action={logout}>
            <button className="fbtn">Logout</button>
          </form>
        </nav>
      </header>
      {children}
    </div>
  );
}
