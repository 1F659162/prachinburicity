import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params; // ✅ ต้อง await ก่อน

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: job, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("category", "job") // กันข้อมูลหมวดอื่น
    .maybeSingle();

  if (!job || error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
          {job.category}
        </span>
      </div>

      <div className="prose max-w-none">
        <p>{job.description}</p>
      </div>
    </div>
  );
}