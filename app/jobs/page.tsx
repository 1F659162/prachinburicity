"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Listing = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  status: string | null;
};

type Job = {
  listing_id: string;
  company_name: string | null;
  salary_range: string | null;
  education: string | null;
  job_type: string | null;
  industrial_estate: string | null;
  listing: Listing;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [eduFilter, setEduFilter] = useState("All");
  const [estateFilter, setEstateFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          listing_id,
          company_name,
          salary_range,
          education,
          job_type,
          industrial_estate,
          listings!inner (
            id,
            slug,
            title,
            description,
            image_url,
            created_at,
            status,
            category
          )
        `)
        .eq("listings.category", "job")
        .order("created_at", {
          foreignTable: "listings",
          ascending: false,
        });

      if (error) {
        console.error("Fetch jobs error:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        setJobs([]);
        setLoading(false);
        return;
      }

      const formatted: Job[] = data.map((item: any) => ({
        listing_id: item.listing_id,
        company_name: item.company_name,
        salary_range: item.salary_range,
        education: item.education,
        job_type: item.job_type,
        industrial_estate: item.industrial_estate,
        listing: {
          id: item.listings.id,
          slug: item.listings.slug,
          title: item.listings.title,
          description: item.listings.description,
          image_url: item.listings.image_url,
          created_at: item.listings.created_at,
          status: item.listings.status,
        },
      }));

      setJobs(formatted);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      job.listing.title.toLowerCase().includes(search) ||
      job.company_name?.toLowerCase().includes(search) ||
      false;

    const matchesSalary =
      salaryFilter === "All" || job.salary_range === salaryFilter;

    const matchesEdu =
      eduFilter === "All" || job.education === eduFilter;

    const matchesEstate =
      estateFilter === "All" ||
      job.industrial_estate === estateFilter;

    return (
      matchesSearch &&
      matchesSalary &&
      matchesEdu &&
      matchesEstate
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto p-6">

        {loading && (
          <div className="text-center py-20 font-bold text-slate-500">
            กำลังโหลดข้อมูล...
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-bold">
            ไม่พบงานที่ค้นหา
          </div>
        )}

        <div className="grid gap-8">
          {filteredJobs.map((job) => (
            <Link
              key={job.listing.id}
              href={`/jobs/${job.listing.slug}`}
              className="block"
            >
              <div className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

                <h3 className="text-2xl font-black text-slate-800 mb-2">
                  {job.listing.title}
                </h3>

                <p className="text-blue-600 font-bold mb-4">
                  {job.company_name ?? "-"}
                </p>

                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                    📍 {job.industrial_estate ?? "-"}
                  </span>

                  <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
                    💰 {job.salary_range ?? "-"}
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    🎓 {job.education ?? "-"}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}