import { client } from "@/sanity/lib/client"

export async function getProjectGalleryData() {
  const configQuery = `*[_type == "projectGallery"][0]{
    title,
    subtitle
  }`

  const projectsQuery = `*[_type == "project"] | order(_createdAt asc) {
    title,
    alt,
    className,
    image {
      asset->{
        url
      }
    }
  }`

  const [config, projectsRaw] = await Promise.all([
    client.fetch(configQuery),
    client.fetch(projectsQuery)
  ])

  // Transform to match component interface
  const images = projectsRaw.map((p: any) => ({
    src: p.image?.asset?.url || "",
    alt: p.alt || p.title,
    className: p.className
  }))

  return {
    ...config,
    images
  }
}
