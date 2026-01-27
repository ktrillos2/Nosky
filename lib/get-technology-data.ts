
import { client } from "@/sanity/lib/client"

export async function getTechnologyData() {
    const configQuery = `*[_type == "technologySection"][0]{
    title,
    subtitle,
    description
  }`

    const categoriesQuery = `*[_type == "technologyCategory"] | order(order asc) {
    title,
    icon,
    items
  }`

    const [config, categories] = await Promise.all([
        client.fetch(configQuery),
        client.fetch(categoriesQuery)
    ])

    return {
        ...config,
        categories
    }
}
