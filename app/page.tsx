import { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'ปราจีนบุรี 2026 | ที่เที่ยว ร้านอาหาร หางาน และที่พัก | Prachinburi City',
  description:
    'Local Lifestyle Portal จังหวัดปราจีนบุรี รวมงาน ที่พัก ร้านอาหาร คาเฟ่ และข้อมูลสำคัญในเมือง',
}

export default async function Home() {
const supabase = createSupabaseServer()
  /* ================= COUNT STATS ================= */

  const { count: jobCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'job')

  const { count: foodCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'food')

  const { count: housingCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'housing')

  /* ================= LATEST ================= */

  const { data: latest } = await supabase
    .from('listings')
    .select('title, category')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  const categories = [
    { title: 'หางานปราจีนบุรี', desc: 'ตำแหน่งงานล่าสุดในนิคม 304 และโรจนะ', icon: '🔍', href: '/jobs' },
    { title: 'ที่พัก & อสังหาฯ', desc: 'หอพัก คอนโด บ้านเช่า ใกล้นิคม', icon: '🏢', href: '/housing' },
    { title: 'ร้านอาหาร & คาเฟ่', desc: 'พิกัดของอร่อยทั่วเมือง', icon: '☕', href: '/food' },
    { title: 'ที่เที่ยวธรรมชาติ', desc: 'น้ำตก วัดดัง จุดเช็คอิน', icon: '🌲', href: '/locations' },
    { title: 'IT & Services', desc: 'บริการเทคโนโลยีในพื้นที่', icon: '💻', href: '/it-hub' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-slate-800">

      {/* ================= HERO ================= */}
      <section className="relative py-28 px-4 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">

          <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
            เมืองปราจีนบุรี
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Lifestyle Portal
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            ศูนย์รวมข้อมูลการใช้ชีวิตในจังหวัดปราจีนบุรี
            งาน ที่พัก ร้านอาหาร และโอกาสใหม่ ๆ
          </p>

          {/* ===== Stats Dynamic ===== */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{jobCount ?? 0}</p>
              <p className="text-sm text-slate-500">ตำแหน่งงาน</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{foodCount ?? 0}</p>
              <p className="text-sm text-slate-500">ร้านอาหาร</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{housingCount ?? 0}</p>
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

      {/* ================= LATEST FROM DB ================= */}
      <section className="bg-white py-20 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-slate-900 mb-10">
            อัปเดตล่าสุดในเมือง
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {latest?.map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-2xl">
                <p className="text-sm text-blue-600 mb-2 font-semibold">
                  {item.category}
                </p>
                <p className="font-bold text-slate-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}