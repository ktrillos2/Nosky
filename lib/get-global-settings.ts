import { client } from "@/sanity/lib/client"

export async function getGlobalSettings() {
    const query = `*[_type == "globalSettings"][0]{
    companyName,
    "logoUrl": logo.asset->url,
    email,
    phone,
    address,
    socialLinks,
    footerText,
    menuItems
  }`

    return await client.fetch(query)
}
