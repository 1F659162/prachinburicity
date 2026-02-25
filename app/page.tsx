import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prachinburi City | เที่ยว ไอที งานอุตสาหกรรม และที่พักปราจีนบุรี',
  description: 'พอร์ทัลรวมข้อมูลปราจีนบุรี: ที่เที่ยว, ไอที, นิคมอุตสาหกรรม, ประกาศหางาน และรวมหอพัก คอนโด บ้านเช่าในปราจีนบุรี ล่าสุด',
  keywords: ['ปราจีนบุรี', 'ที่เที่ยวปราจีนบุรี', 'ไอทีปราจีนบุรี', 'Prachinburi City', 'อุตสาหกรรมปราจีน', 'หางานปราจีน', 'หอพักปราจีนบุรี', 'คอนโดปราจีนบุรี', 'บ้านเช่าปราจีนบุรี'],
}

export default function Home() {
  const categories = [
    { title: 'ที่เที่ยวปราจีนบุรี', desc: 'ธรรมชาติ น้ำตก และวัดดัง', icon: '🌲', color: 'hover:border-green-500' },
    { title: 'ไอทีปราจีนบุรี', desc: 'เทคโนโลยี และคอร์สเรียน IT', icon: '💻', color: 'hover:border-blue-500' },
    { title: 'อุตสาหกรรมปราจีน', desc: 'ข้อมูลนิคมและโรงงานในพื้นที่', icon: '🏭', color: 'hover:border-orange-500' },
    { title: 'หางานปราจีน', desc: 'อัปเดตตำแหน่งงานว่างล่าสุด', icon: '🔍', color: 'hover:border-red-500' },
    { title: 'ที่พัก & อสังหาฯ', desc: 'หอพัก คอนโด และบ้านเช่า', icon: '🏢', color: 'hover:border-purple-500' },
    { title: 'ร้านอาหาร & คาเฟ่', desc: 'รวมพิกัดของอร่อยเมืองปราจีน', icon: '☕', color: 'hover:border-yellow-500' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <section className="relative py-24 px-4 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            PRACHINBURI <span className="text-blue-500">CITY</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed font-light">
            พอร์ทัลข้อมูลเมืองดิจิทัล รวมครบทั้ง <span className="text-slate-200 font-medium">งาน ที่พัก ที่เที่ยว</span> และ <span className="text-slate-200 font-medium">ไอที</span>
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl transition-all cursor-pointer group ${item.color} hover:bg-slate-900/80 hover:-translate-y-2`}
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section / SEO Text */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center border-t border-slate-900/50">
        <h2 className="text-3xl font-bold text-white mb-6">เชื่อมต่อทุกโอกาสในปราจีนบุรี</h2>
        <p className="text-lg text-slate-500 leading-relaxed italic">
          "ไม่ว่าคุณจะเป็นคนในพื้นที่ หรือกำลังย้ายมาทำงานที่นิคมอุตสาหกรรมโรจนะ 304 หรือกบินทร์บุรี 
          เราพร้อมเป็นสื่อกลางในการค้นหาที่พักที่ถูกใจ งานที่ใช่ และไลฟ์สไตล์ที่ลงตัว"
        </p>
      </section>

      <footer className="py-12 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© 2026 Prachinburi City Digital Portal. All rights reserved.</p>
        <p className="mt-2 text-slate-700">Next.js 15 + Supabase + Tailwind CSS</p>
      </footer>
    </main>
  )
}