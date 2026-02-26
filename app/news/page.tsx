import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default async function NewsPage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div>Error loading articles</div>
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      <h1 className="text-4xl font-bold mb-8">ข่าวปราจีนบุรี</h1>

      <div className="grid gap-6">
        {articles?.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="p-6 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <h2 className="text-2xl font-semibold">
              {article.title}
            </h2>
            <p className="text-gray-400 mt-2">
              {article.meta_description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}