
import { client } from "@/sanity/lib/client"

export async function getGlobalData() {
    const query = `*[_type == "globalSettings"][0]{
    companyName,
    seoTitle,
    seoDescription,
    logo {
      asset->{
        url
      }
    },
    logoDark {
      asset->{
        url
      }
    },
    menuItems,
    email,
    phone,
    phone2,
    whatsapp,
    address,
    googleMapsUrl,
    footerText,
    footerCopyright,
    socialLinks[]{
      platform,
      url
    }
  }`

    const data = await client.fetch(query)

    return data
}
