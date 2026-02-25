import { supabase } from '@/lib/supabase'

export default async function ITHubPage() {
  // ดึงข้อมูลจากตาราง it_services
  const { data: services, error } = await supabase
    .from('it_services')
    .select('*')
    .order('type', { ascending: true })

  if (error) return <div className="p-10 text-white text-center">ไม่สามารถโหลดข้อมูลไอทีได้</div>

  // แยกกลุ่มตามประเภทบริการ
  const courses = services?.filter(s => s.type === 'คอร์สเรียน')
  const technical = services?.filter(s => s.type !== 'คอร์สเรียน')

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] -z-10" />
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            PRACHINBURI IT HUB
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            ศูนย์รวมความรู้เทคโนโลยี บริการซ่อมบำรุง และแหล่งพัฒนาทักษะดิจิทัลของชาวปราจีนบุรี
          </p>
        </div>

        {/* Section: คอร์สเรียน & การศึกษา */}
        {courses && courses.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">🎓</span>
              คอร์สเรียนและเวิร์กชอป
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((item) => (
                <ITCard key={item.id} item={item} isHighlight />
              ))}
            </div>
          </section>
        )}

        {/* Section: บริการด้านเทคนิค & ร้านค้า */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">🛠️</span>
            บริการซ่อมและวางระบบ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technical?.map((item) => (
              <ITCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ITCard({ item, isHighlight = false }: { item: any, isHighlight?: boolean }) {
  return (
    <div className={`
      relative overflow-hidden rounded-3xl border transition-all duration-300 group
      ${isHighlight 
        ? 'bg-gradient-to-br from-blue-900/40 to-slate-900 border-blue-500/30 p-8 hover:border-blue-500/60' 
        : 'bg-slate-900/40 border-slate-800 p-6 hover:border-cyan-500/40'
      }
    `}>
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
          {item.type}
        </span>
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
          {item.type === 'คอร์สเรียน' ? '🚀' : '🔧'}
        </div>
      </div>

      <h3 className={`font-bold mb-2 ${isHighlight ? 'text-2xl text-white' : 'text-xl text-slate-100'}`}>
        {item.title}
      </h3>
      <p className="text-blue-400 text-sm mb-4 font-medium">{item.provider}</p>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {item.description}
      </p>

      <div className="mt-auto">
        <a 
          href={item.contact_link || '#'} 
          className={`
            inline-flex items-center gap-2 font-bold text-sm transition-all
            ${isHighlight ? 'text-blue-400 hover:text-blue-300' : 'text-cyan-400 hover:text-cyan-300'}
          `}
        >
          ติดต่อสอบถามรายละเอียด 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  )
}