import { Metadata } from 'next'
import Link from 'next/link'
import Image from "next/image";

export const metadata: Metadata = {
  title: 'ปราจีนบุรี 2026 | ที่เที่ยว ร้านอาหาร หางาน และที่พัก | Prachinburi City',
  description:
    'Local Lifestyle Portal จังหวัดปราจีนบุรี รวมงาน ที่พัก ร้านอาหาร คาเฟ่ และข้อมูลสำคัญในเมือง',
}

export default function Home() {
  const categories = [
    { title: 'หางานปราจีนบุรี', desc: 'ตำแหน่งงานล่าสุดในนิคม 304 และโรจนะ', icon: '🔍', href: '/jobs' },
    { title: 'ที่พัก & อสังหาฯ', desc: 'หอพัก คอนโด บ้านเช่า ใกล้นิคม', icon: '🏢', href: '/housing' },
    { title: 'ร้านอาหาร & คาเฟ่', desc: 'พิกัดของอร่อยทั่วเมือง', icon: '☕', href: '/food' },
    { title: 'ที่เที่ยวธรรมชาติ', desc: 'น้ำตก วัดดัง จุดเช็คอิน', icon: '🌲', href: '/locations' },
    { title: 'อุตสาหกรรม', desc: 'ข้อมูลนิคมและโรงงาน', icon: '🏭', href: '/locations' },
    { title: 'IT & Services', desc: 'บริการเทคโนโลยีในพื้นที่', icon: '💻', href: '/it-hub' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-slate-800">



      {/* ================= HERO ================= */}
      <section className="relative py-28 px-4 text-center overflow-hidden">

        {/* Soft background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 blur-[140px] rounded-full opacity-40" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-200 blur-[140px] rounded-full opacity-40" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="sr-only">
            ปราจีนบุรี | Local Lifestyle Portal | Prachinburi City
          </h1>

          <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
            เมืองปราจีนบุรี
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Lifestyle Portal
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            ศูนย์รวมข้อมูลการใช้ชีวิตในจังหวัดปราจีนบุรี
            งาน ที่พัก ร้านอาหาร และโอกาสใหม่ ๆ สำหรับคนท้องถิ่นและคนทำงานนิคม
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto flex shadow-lg rounded-2xl overflow-hidden border border-blue-100">
            <input
              type="text"
              placeholder="ค้นหางาน ร้านอาหาร หรือสถานที่..."
              className="flex-1 px-5 py-4 bg-white focus:outline-none"
            />
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
              ค้นหา
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">150+</p>
              <p className="text-sm text-slate-500">ตำแหน่งงาน</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">320+</p>
              <p className="text-sm text-slate-500">ร้านอาหาร</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">85+</p>
              <p className="text-sm text-slate-500">ที่พัก</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY GRID ================= */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          สำรวจหมวดหมู่
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <Link href={item.href} key={idx}>
              <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-100">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= LATEST ================= */}
      <section className="bg-white py-20 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-slate-900 mb-10">
            อัปเดตล่าสุดในเมือง
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <p className="text-sm text-blue-600 mb-2 font-semibold">งานใหม่</p>
              <p className="font-bold text-slate-800">บริษัทนิคม 304 รับสมัครเพิ่ม 20 ตำแหน่ง</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <p className="text-sm text-blue-600 mb-2 font-semibold">ห้องพักใหม่</p>
              <p className="font-bold text-slate-800">หอพักเปิดใหม่ ใกล้โรจนะ เริ่มต้น 3,000 บาท</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <p className="text-sm text-blue-600 mb-2 font-semibold">ร้านเปิดใหม่</p>
              <p className="font-bold text-slate-800">คาเฟ่เปิดใหม่ กบินทร์บุรี</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}


    </main>
  )
}