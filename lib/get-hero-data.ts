import { client } from "@/sanity/lib/client"

export async function getHeroData() {
    const query = `*[_type == "hero"][0]{
    title,
    subtitle,
    carouselImages[]{
      "src": image.asset->url,
      alt,
      position,
      fit,
      overlayColor,
      _key
    }
  }`

    return await client.fetch(query)
}
