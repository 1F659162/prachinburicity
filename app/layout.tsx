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
  description: "Digital city portal for jobs, food, stays and local businesses",
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
{/* ================= NAVBAR ================= */}
<nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
    
    {/* Logo */}
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Prachinburi City"
        width={150}
        height={45}
        priority
        className="object-contain"
      />
    </Link>

    {/* Menu */}
    <div className="hidden md:flex items-center gap-8 text-sm text-slate-600 relative">
      
      <Link href="/" className="hover:text-black transition">
        หน้าแรก
      </Link>

      {/* Dropdown */}
      <div className="relative group">
        <button className="hover:text-black transition flex items-center gap-1">
          หมวดหมู่
          <span className="text-xs">▾</span>
        </button>

        <div className="absolute left-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="p-3 space-y-2 text-sm">
            <Link href="/jobs" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              งาน
            </Link>
            <Link href="/stays" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              ที่พัก & อสังหา
            </Link>
            <Link href="/food" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              ร้านอาหาร & คาเฟ่
            </Link>
            <Link href="/travel" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              ที่เที่ยวธรรมชาติ
            </Link>
            <Link href="/industry" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              อุตสาหกรรม
            </Link>
            <Link href="/services" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              IT & Services
            </Link>
          </div>
        </div>
      </div>

      <Link href="/about" className="hover:text-black transition">
        เกี่ยวกับ
      </Link>

      {/* CTA */}
      <Link
        href="/post"
        className="ml-6 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-sm"
      >
        ลงประกาศฟรี
      </Link>

    </div>
  </div>
</nav>

        {/* ================= PAGE CONTENT ================= */}
        <main className="min-h-screen">{children}</main>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-gray-100 py-14">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8 text-sm text-slate-500">
            
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">
                Prachinburi City
              </h4>
              <p>
                แพลตฟอร์มรวมงาน ธุรกิจ ร้านอาหาร และที่พักในจังหวัดปราจีนบุรี
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-3">หมวดหมู่</h4>
              <ul className="space-y-2">
                <li><Link href="/jobs">งาน</Link></li>
                <li><Link href="/restaurants">ร้านอาหาร</Link></li>
                <li><Link href="/stays">ที่พัก</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-3">เกี่ยวกับ</h4>
              <ul className="space-y-2">
                <li><Link href="/about">เกี่ยวกับเรา</Link></li>
                <li><Link href="/contact">ติดต่อ</Link></li>
                <li><Link href="/privacy">นโยบายความเป็นส่วนตัว</Link></li>
              </ul>
            </div>

          </div>

          <div className="text-center text-xs text-slate-400 mt-12">
            © 2026 Prachinburi City. All rights reserved.
          </div>
        </footer>

        <GoogleAnalytics />
      </body>
    </html>
  );
}