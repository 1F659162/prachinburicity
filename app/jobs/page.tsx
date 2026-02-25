"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [eduFilter, setEduFilter] = useState("All");
  const [estateFilter, setEstateFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from("jobs").select("*").order('created_at', { ascending: false });
      if (data) setJobs(data);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    // ใช้ position_title ให้ตรงกับ Database เพื่อแก้ Error
    const matchesSearch = 
      (job.position_title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) || 
      (job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesSalary = salaryFilter === "All" || job.salary_range === salaryFilter;
    const matchesEdu = eduFilter === "All" || job.education === eduFilter;
    const matchesEstate = estateFilter === "All" || job.industrial_estate === estateFilter;
    
    return matchesSearch && matchesSalary && matchesEdu && matchesEstate;
  });

  return (
    <div className="min-h-screen bg-[#f0f4f8] pb-20 font-sans">
      
      {/* Header ดีไซน์สดใส PRACHINBURI JOBS */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 pb-44 pt-20 px-6 shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight uppercase">
            PRACHINBURI <span className="text-cyan-100">JOBS</span>
          </h1>
          <p className="text-blue-50 text-xl md:text-2xl font-medium opacity-90 italic">
            "ก้าวแรกสู่โอกาสงานที่ดีที่สุดในเมืองปราจีนบุรี"
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-24">
        
        {/* แผง Filter Bar - เน้นความโค้งมนและกระจกใส (Glassmorphism) */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            
            {/* ช่องค้นหาหลัก */}
            <div className="md:col-span-4 relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 text-2xl">🔍</span>
              <input
                type="text"
                placeholder="พิมพ์ตำแหน่งงาน, ชื่อบริษัท หรือทักษะที่ต้องการ..."
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-blue-50 rounded-[2rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:outline-none transition-all text-slate-800 text-xl font-bold shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Dropdowns ปรับตัวหนังสือให้ Bold และชัดเจนขึ้น */}
            <select 
              onChange={(e) => setSalaryFilter(e.target.value)} 
              className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-extrabold cursor-pointer outline-none hover:border-blue-300 transition-colors shadow-sm"
            >
              <option value="All">💰 ทุกช่วงเงินเดือน</option>
              <option value="15k-20k">15,000 - 20,000</option>
              <option value="20k-30k">20,000 - 30,000</option>
              <option value="30k+">30,000 ขึ้นไป</option>
            </select>

            <select 
              onChange={(e) => setEduFilter(e.target.value)} 
              className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-extrabold cursor-pointer outline-none hover:border-blue-300 transition-colors shadow-sm"
            >
              <option value="All">🎓 ทุกวุฒิการศึกษา</option>
              <option value="ปวช./ปวส.">ปวช./ปวส.</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
            </select>

            <select 
              onChange={(e) => setEstateFilter(e.target.value)} 
              className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-extrabold cursor-pointer outline-none hover:border-blue-300 transition-colors shadow-sm"
            >
              <option value="All">📍 ทุกนิคม/ทุกพื้นที่</option>
              <option value="นิคม 304">นิคม 304</option>
              <option value="นิคมโรจนะ">นิคมโรจนะ</option>
              <option value="นิคมไฮเทค">นิคมไฮเทค</option>
              <option value="นอกนิคม">นอกนิคม/ในตัวเมือง</option>
            </select>

            <button 
              onClick={() => window.location.reload()} 
              className="p-4 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl transition-all shadow-lg hover:shadow-rose-200 active:scale-95"
            >
              รีเซ็ตทั้งหมด
            </button>
          </div>
        </div>

        {/* รายการงาน - การ์ดสีขาวสว่าง ตัวหนังสือเข้มอ่านง่าย */}
        <div className="grid gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="group relative p-10 bg-white rounded-[2.5rem] border-2 border-white shadow-[0_15px_40px_rgba(30,64,175,0.08)] hover:shadow-[0_30px_60px_rgba(30,64,175,0.15)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-3xl font-black text-[#1e293b] group-hover:text-blue-600 transition-colors leading-tight">
                        {job.position_title}
                      </h3>
                      <span className="px-4 py-1 bg-cyan-100 text-cyan-600 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm">
                        รับสมัครด่วน
                      </span>
                    </div>
                    
                    <p className="text-blue-500 font-extrabold text-xl flex items-center gap-3 mb-8">
                      <span className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-xl text-blue-600">🏢</span> 
                      {job.company_name}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-[15px] font-bold text-slate-500 bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200">
                        📍 {job.industrial_estate || job.work_location}
                      </div>
                      <div className="flex items-center gap-2 text-[15px] font-bold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100">
                        💰 {job.salary_text}
                      </div>
                      <div className="flex items-center gap-2 text-[15px] font-bold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100">
                        🎓 {job.education}
                      </div>
                    </div>
                  </div>

                  {/* ปุ่มกดสไตล์ Modern Gradient */}
                  <button className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-[1.5rem] transition-all duration-300 shadow-xl shadow-blue-200 active:scale-95 text-xl">
                    อ่านรายละเอียด
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white/40 backdrop-blur-sm border-4 border-dashed border-white rounded-[4rem]">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-slate-500 text-2xl font-black italic">ไม่พบงานที่กำลังค้นหา... ลองเปลี่ยนคำค้นดูนะ!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 text-center">
        <p className="text-slate-400 text-base font-bold">
          © 2024 Prachinburi City — แพลตฟอร์มเพื่อโอกาสงานของคนในจังหวัด
        </p>
      </footer>
    </div>
  );
}