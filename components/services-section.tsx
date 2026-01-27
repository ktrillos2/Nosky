import { getServicesData } from "@/lib/get-services-data"
import { ServicesClient } from "@/components/services-client"

export async function ServicesSection() {
    const servicesData = await getServicesData()

    // Fallback data if Sanity fetch fails - We return null so the component can handle it or show skeleton
    // The component will just render null if data is missing, effectively hiding the section 
    // until data is present (or we could default to the hardcoded array again here, but we put it in the schema)

    // Actually, for a smoother dev experience, let's just pass what we get.
    return <ServicesClient data={servicesData} />
}
