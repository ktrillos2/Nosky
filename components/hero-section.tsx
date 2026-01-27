import { getHeroData } from "@/lib/get-hero-data"
import { HeroClient } from "@/components/hero-client"

export async function HeroSection() {
    const heroData = await getHeroData()

    // Fallback data if Sanity fetch fails or is empty initially (only for dev safety, optional)
    const safeData = heroData || {
        title: "",
        subtitle: "",
        carouselImages: []
    }

    return <HeroClient data={safeData} />
}
