import { supabase } from '@/lib/supabase'

export default async function LocationsPage() {
  // ดึงข้อมูลทั้งหมดจากตาราง locations
  const { data: locations, error } = await supabase
    .from('locations')
    .select('*')
    .order('category', { ascending: true })

  if (error) return <div className="p-10 text-white text-center">เกิดข้อผิดพลาดในการโหลดข้อมูลสถานที่</div>

  // แยกกลุ่มข้อมูลตาม Category เพื่อความสวยงามในการแสดงผล
  const tourism = locations?.filter(loc => loc.category === 'tourism')
  const industrial = locations?.filter(loc => loc.category === 'industrial')

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-2 text-blue-500">พิกัดสำคัญในปราจีนบุรี</h1>
        <p className="text-slate-400 mb-12">รวมที่เที่ยวธรรมชาติและย่านอุตสาหกรรมหลักของจังหวัด</p>

        {/* Section: ที่เที่ยวปราจีนบุรี */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">🌲</span> ที่เที่ยวและแลนด์มาร์ค
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourism?.map((loc) => (
              <LocationCard key={loc.id} loc={loc} accentColor="border-green-500/30" />
            ))}
          </div>
        </section>

        {/* Section: นิคมอุตสาหกรรม */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">🏭</span> ย่านนิคมอุตสาหกรรม
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrial?.map((loc) => (
              <LocationCard key={loc.id} loc={loc} accentColor="border-orange-500/30" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// Component ย่อยสำหรับ Card สถานที่
function LocationCard({ loc, accentColor }: { loc: any, accentColor: string }) {
  return (
    <div className={`bg-slate-900/50 border ${accentColor} p-6 rounded-3xl hover:bg-slate-900 transition-all group`}>
      <div className="h-40 bg-slate-800 rounded-2xl mb-4 overflow-hidden">
        {loc.image_url ? (
          <img src={loc.image_url} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{loc.name}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{loc.description}</p>
      <div className="text-xs text-slate-500 flex items-center gap-1">
        📍 {loc.address}
      </div>
    </div>
  )
}