import { supabase } from '@/lib/supabase'

export default async function FoodPage() {
  // ดึงข้อมูลจากตาราง food_spots
  const { data: foods, error } = await supabase
    .from('food_spots')
    .select('*')
    .order('rating', { ascending: false })

  if (error) return <div className="p-10 text-white text-center">เกิดข้อผิดพลาดในการดึงพิกัดของอร่อย</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-l-4 border-yellow-500 pl-6">
          <h1 className="text-4xl font-black mb-2 text-yellow-500">ร้านอาหาร & คาเฟ่ปราจีนบุรี</h1>
          <p className="text-slate-400 font-light">รวมพิกัดของอร่อย ตั้งแต่ร้านลับยันคาเฟ่ยอดฮิตในเมืองปราจีน</p>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods?.map((spot) => (
            <div key={spot.id} className="bg-slate-900/40 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-yellow-500/50 transition-all group shadow-xl">
              
              {/* Image Area */}
              <div className="relative h-56 bg-slate-800">
                {spot.image_url ? (
                  <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 text-4xl">🍜</div>
                )}
                {/* Badge Price Range */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-yellow-400 text-sm font-bold">
                  {spot.price_range}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{spot.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-1 text-sm font-bold">{spot.rating}</span>
                    <span className="text-xs">⭐</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">{spot.type}</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">{spot.zone}</span>
                </div>

                <p className="text-slate-400 text-sm mb-4">
                  <span className="text-yellow-500/80 font-medium">เมนูเด็ด:</span> {spot.highlight_menu}
                </p>

                <div className="flex items-center text-xs text-slate-500 mb-6">
                   🕒 {spot.opening_hours || 'ไม่ได้ระบุเวลาเปิด-ปิด'}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a 
                    href={spot.map_url || '#'} 
                    target="_blank" 
                    className="flex-1 text-center bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 rounded-xl text-sm transition"
                  >
                    ดูแผนที่
                  </a>
                  <button className="px-4 py-2 border border-slate-700 hover:bg-slate-800 rounded-xl text-sm">
                    รีวิว
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}