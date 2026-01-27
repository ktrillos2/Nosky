
import { client } from "@/sanity/lib/client"

export async function getVideoData() {
  const query = `*[_type == "videoSection"][0]{
    title,
    description,
    "videoUrl": videoFile.asset->url,
    "externalVideoUrl": videoUrl
  }`

  const data = await client.fetch(query)
  return data
}
