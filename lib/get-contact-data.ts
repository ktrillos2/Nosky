
import { client } from "@/sanity/lib/client"

export async function getContactData() {
    const configQuery = `*[_type == "contactSection"][0]{
    title,
    subtitle,
    description
  }`

    const globalQuery = `*[_type == "globalSettings"][0]{
    email,
    phone,
    phone2,
    address,
    whatsapp,
    socialLinks
  }`

    const [config, global] = await Promise.all([
        client.fetch(configQuery),
        client.fetch(globalQuery)
    ])

    return {
        ...config,
        ...global
    }
}
