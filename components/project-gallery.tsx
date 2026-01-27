import { getProjectGalleryData } from "@/lib/get-project-gallery-data"
import { ProjectGalleryClient } from "@/components/project-gallery-client"

export async function ProjectGallery() {
    const galleryData = await getProjectGalleryData()

    // Fallback data if Sanity fetch fails or is empty initially (only for dev safety, optional)
    // For images, we provide a safe fallback array so it doesn't crash if Sanity returns empty images
    const safeData = galleryData || {
        title: "",
        subtitle: "",
        images: []
    }

    return <ProjectGalleryClient data={safeData} />
}
