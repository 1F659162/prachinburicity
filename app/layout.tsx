import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prachinburi City",
  description: "Digital portal for Prachinburi residents",
  verification: {
    google: "IipJ6P566r8jze0FhLfT2Y4YMQowyynKJJBYwIWSTeY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-800`}
      >
        {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Prachinburi City Logo"
                width={200}
                height={60}
                priority
              />
              <span className="font-black text-xl tracking-tight text-blue-600">
                PRACHINBURI CITY
              </span>
            </Link>

            <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition">
                หน้าแรก
              </Link>
              <Link href="/jobs" className="hover:text-blue-600 transition">
                หางาน
              </Link>
              <Link href="/post-job" className="hover:text-blue-600 transition">
                ลงประกาศ
              </Link>
            </div>

          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <main>{children}</main>

        {/* ================= FOOTER ================= */}
      <footer className="bg-blue-600 text-white py-12 text-center">
        <div className="mb-4 flex justify-center gap-8 text-sm font-medium">
          <Link href="/about" className="hover:underline">เกี่ยวกับเรา</Link>
          <Link href="/contact" className="hover:underline">ติดต่อ</Link>
          <Link href="/privacy" className="hover:underline">นโยบายความเป็นส่วนตัว</Link>
        </div>
        <p className="text-blue-100 text-sm">
          © 2026 Prachinburi City • Local Lifestyle Portal
        </p>
      </footer>

        <GoogleAnalytics />
      </body>
    </html>
  );
}