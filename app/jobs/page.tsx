import { supabase } from '@/lib/supabase'

export default async function JobsPage() {
  // ดึงข้อมูลจากตาราง jobs ที่คุณรัน SQL ไว้เมื่อครู่
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div>เกิดข้อผิดพลาดในการดึงข้อมูล</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">หางานปราจีนบุรี ล่าสุด</h1>
      <div className="grid gap-6">
        {jobs?.map((job) => (
          <div key={job.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
            <h2 className="text-xl font-bold">{job.position_title}</h2>
            <p className="text-emerald-400">{job.company_name}</p>
            <div className="flex gap-4 mt-2 text-sm text-slate-400">
              <span>📍 {job.work_location}</span>
              <span>💰 {job.salary_text}</span>
            </div>
            <p className="mt-4 text-slate-500">{job.job_description}</p>
            <button className="mt-4 bg-blue-600 px-4 py-2 rounded-lg text-sm">ดูรายละเอียด/สมัครงาน</button>
          </div>
        ))}
      </div>
    </div>
  )
}