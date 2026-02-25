import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prachinburi City | เที่ยว ไอที งานอุตสาหกรรม และที่พักปราจีนบุรี',
  description: 'พอร์ทัลรวมข้อมูลปราจีนบุรี: ที่เที่ยว, ไอที, นิคมอุตสาหกรรม, ประกาศหางาน และรวมหอพัก คอนโด บ้านเช่าในปราจีนบุรี ล่าสุด',
  keywords: ['ปราจีนบุรี', 'ที่เที่ยวปราจีนบุรี', 'ไอทีปราจีนบุรี', 'Prachinburi City', 'อุตสาหกรรมปราจีน', 'หางานปราจีน', 'หอพักปราจีนบุรี', 'คอนโดปราจีนบุรี', 'บ้านเช่าปราจีนบุรี'],
}

export default function Home() {
  const categories = [
    { title: 'ที่เที่ยวปราจีนบุรี', desc: 'ธรรมชาติ น้ำตก และวัดดัง', icon: '🌲', color: 'hover:border-green-500/50 group-hover:bg-green-500/10', href: '/locations' },
    { title: 'ไอทีปราจีนบุรี', desc: 'เทคโนโลยี และคอร์สเรียน IT', icon: '💻', color: 'hover:border-blue-500/50 group-hover:bg-blue-500/10', href: '/it-hub' },
    { title: 'อุตสาหกรรมปราจีน', desc: 'ข้อมูลนิคมและโรงงานในพื้นที่', icon: '🏭', color: 'hover:border-orange-500/50 group-hover:bg-orange-500/10', href: '/locations' },
    { title: 'หางานปราจีน', desc: 'อัปเดตตำแหน่งงานว่างล่าสุด', icon: '🔍', color: 'hover:border-red-500/50 group-hover:bg-red-500/10', href: '/jobs' },
    { title: 'ที่พัก & อสังหาฯ', desc: 'หอพัก คอนโด และบ้านเช่า', icon: '🏢', color: 'hover:border-purple-500/50 group-hover:bg-purple-500/10', href: '/housing' },
    { title: 'ร้านอาหาร & คาเฟ่', desc: 'รวมพิกัดของอร่อยเมืองปราจีน', icon: '☕', color: 'hover:border-yellow-500/50 group-hover:bg-yellow-500/10', href: '/food' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative py-24 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">
            Digital Portal for Local Residents
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
            PRACHINBURI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">CITY</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            เข้าถึงทุกโอกาสและข้อมูลสำคัญใน <span className="text-slate-200 font-medium">เมืองปราจีนบุรี</span> ครบจบในที่เดียว
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
             <Link href="/jobs" className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95">
                หาตำแหน่งงาน
             </Link>
             <Link href="/housing" className="px-10 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95">
                ดูหอพัก/คอนโด
             </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, idx) => (
            <Link href={item.href} key={idx} className="group">
              <div 
                className={`h-full bg-slate-900/30 backdrop-blur-md border border-slate-800 p-8 rounded-[2.5rem] transition-all duration-300 ${item.color} group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-black/50 active:scale-95`}
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-400 transition-colors">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center text-sm font-bold text-blue-500/0 group-hover:text-blue-500 transition-all duration-300 uppercase tracking-widest">
                  Explore More <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section / SEO Text */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <h2 className="text-[12rem] font-black select-none uppercase">PRACHIN</h2>
        </div>
        <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">เชื่อมต่อทุกโอกาสในปราจีนบุรี</h2>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed italic max-w-3xl mx-auto">
              "ไม่ว่าคุณจะเป็นคนในพื้นที่ หรือกำลังย้ายมาทำงานที่นิคมอุตสาหกรรม <span className="text-blue-500/80 not-italic font-bold">โรจนะ, 304 หรือกบินทร์บุรี</span> 
              เราพร้อมเป็นสื่อกลางในการค้นหาที่พักที่ถูกใจ งานที่ใช่ และไลฟ์สไตล์ที่ลงตัว"
            </p>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="flex justify-center gap-8 mb-8 text-slate-500 uppercase text-xs font-bold tracking-[0.2em]">
            <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <Link href="/housing" className="hover:text-white transition-colors">Housing</Link>
            <Link href="/locations" className="hover:text-white transition-colors">Tourism</Link>
        </div>
        <p className="text-slate-600 text-sm italic">© 2026 Prachinburi City Digital Portal. All rights reserved.</p>
        <div className="mt-4 flex justify-center items-center gap-2">
            <div className="h-[1px] w-8 bg-slate-800" />
            <p className="text-slate-700 font-mono text-[10px]">Built with Next.js 15 • Supabase • Tailwind</p>
            <div className="h-[1px] w-8 bg-slate-800" />
        </div>
      </footer>
    </main>
  )
}