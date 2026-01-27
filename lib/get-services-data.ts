import { client } from "@/sanity/lib/client"

export async function getServicesData() {
  const configQuery = `*[_type == "servicesSection"][0]{
    title,
    subtitle
  }`

  // Fetch all service documents, ordered by creation time or a specific field if we had one. 
  // For now, default order is fine or we can sort by _createdAt asc.
  const servicesQuery = `*[_type == "service"] | order(_createdAt asc) {
    title,
    description,
    icon,
    features,
    image {
      asset->{
        url
      }
    },
    conclusion,
    imagePosition,
    imageFit
  }`

  const [config, servicesRaw] = await Promise.all([
    client.fetch(configQuery),
    client.fetch(servicesQuery)
  ])

  // Map the services to flatten the image URL structure if needed by the component
  const services = servicesRaw.map((s: any) => ({
    ...s,
    image: s.image?.asset?.url || null
  }))

  return {
    ...config,
    services
  }
}
