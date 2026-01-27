
import { client } from "@/sanity/lib/client"

export async function getPortfolioData() {
  const configQuery = `*[_type == "portfolioSection"][0]{
    title,
    subtitle,
    description
  }`

  const itemsQuery = `*[_type == "portfolioItem"] | order(orderRank asc) {
    _id,
    title,
    category,
    description,
    "image": image.asset->url,
    tech
  }`

  const [config, items] = await Promise.all([
    client.fetch(configQuery),
    client.fetch(itemsQuery)
  ])

  return {
    ...config,
    items
  }
}
