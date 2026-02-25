import { supabase } from '@/lib/supabase'

export default async function HousingPage() {
  const { data: homes, error } = await supabase
    .from('housing')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-10 text-white">เกิดข้อผิดพลาด...</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">หอพัก & ที่พักปราจีนบุรี</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {homes?.map((item) => (
          <div key={item.id} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <span className="bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full">{item.type}</span>
            </div>
            <p className="text-slate-400 mb-4">📍 {item.location_zone}</p>
            <p className="text-2xl font-bold text-white mb-4">฿{item.price_start?.toLocaleString()}<span className="text-sm font-normal text-slate-500"> /เดือน</span></p>
            <a href={`tel:${item.phone_contact}`} className="block text-center bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition">
              📞 โทรสอบถาม: {item.phone_contact}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}