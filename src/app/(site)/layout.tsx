import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import ScrollToTop from "@/components/ScrollToTop";

/** Public site chrome — admin routes render without it. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Terminal />
    </>
  );
}
