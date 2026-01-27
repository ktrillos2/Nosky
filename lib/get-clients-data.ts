
import { client } from "@/sanity/lib/client"

export async function getClientsData() {
    const configQuery = `*[_type == "clientsSection"][0]{
    title,
    subtitle
  }`

    const itemsQuery = `*[_type == "clientItem"] | order(order asc) {
    _id,
    name,
    description,
    icon
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
