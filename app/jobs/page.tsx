"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [eduFilter, setEduFilter] = useState("All");
  const [estateFilter, setEstateFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setJobs(data);
    };

    fetchJobs();
  }, []);

  const resetFilters = () => {
    setSearchTerm("");
    setSalaryFilter("All");
    setEduFilter("All");
    setEstateFilter("All");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.position_title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);

    const matchesSalary =
      salaryFilter === "All" || job.salary_range === salaryFilter;

    const matchesEdu =
      eduFilter === "All" || job.education === eduFilter;

    const matchesEstate =
      estateFilter === "All" ||
      job.industrial_estate === estateFilter;

    return matchesSearch && matchesSalary && matchesEdu && matchesEstate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 font-sans">



      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 pb-36 pt-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            PRACHINBURI <span className="text-blue-100">JOBS</span>
          </h1>
          <p className="text-blue-50 text-xl mt-4 font-medium italic">
            โอกาสงานคุณภาพในจังหวัดปราจีนบุรี
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-24 pb-20">

        {/* ================= FILTER CARD ================= */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div className="md:col-span-4 relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 text-xl">
                🔍
              </span>
              <input
                type="text"
                value={searchTerm}
                placeholder="ค้นหาตำแหน่งงาน หรือชื่อบริษัท..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-sky-50 border border-sky-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition text-slate-700 font-semibold"
              />
            </div>

            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="p-4 bg-sky-50 border border-sky-100 rounded-2xl font-bold text-slate-600"
            >
              <option value="All">ทุกช่วงเงินเดือน</option>
              <option value="15k-20k">15,000 - 20,000</option>
              <option value="20k-30k">20,000 - 30,000</option>
              <option value="30k+">30,000+</option>
            </select>

            <select
              value={eduFilter}
              onChange={(e) => setEduFilter(e.target.value)}
              className="p-4 bg-sky-50 border border-sky-100 rounded-2xl font-bold text-slate-600"
            >
              <option value="All">ทุกวุฒิ</option>
              <option value="ปวช./ปวส.">ปวช./ปวส.</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
            </select>

            <select
              value={estateFilter}
              onChange={(e) => setEstateFilter(e.target.value)}
              className="p-4 bg-sky-50 border border-sky-100 rounded-2xl font-bold text-slate-600"
            >
              <option value="All">ทุกพื้นที่</option>
              <option value="นิคม 304">นิคม 304</option>
              <option value="นิคมโรจนะ">นิคมโรจนะ</option>
              <option value="นิคมไฮเทค">นิคมไฮเทค</option>
              <option value="นอกนิคม">ในเมือง/นอกนิคม</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl transition shadow-md"
            >
              รีเซ็ต
            </button>
          </div>
        </div>

        {/* ================= JOB LIST ================= */}
        <div className="grid gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-8 bg-white rounded-3xl border border-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-800 mb-2">
                      {job.position_title}
                    </h3>

                    <p className="text-blue-600 font-bold mb-4">
                      {job.company_name}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm font-semibold">
                      <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                        📍 {job.industrial_estate || job.work_location}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
                        💰 {job.salary_text}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                        🎓 {job.education}
                      </span>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition">
                    อ่านรายละเอียด
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-slate-500 font-bold">
              ไม่พบงานที่ค้นหา
            </div>
          )}
        </div>
      </div>
    </div>
  );
}