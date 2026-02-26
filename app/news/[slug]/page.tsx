import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

export default async function NewsDetail(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) {
    notFound()   // ✅ ดีกว่า return div
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data } = await supabase
    .from("articles")
    .select("title, content")
    .eq("slug", slug)
    .single()

  return {
    title: data?.title ?? "ข่าว",
    description: data?.content?.slice(0, 150) ?? "",
  }
}