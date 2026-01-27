
import { getTechnologyData } from "@/lib/get-technology-data"
import { TechnologyClient } from "@/components/technology-client"

export async function TechnologySection() {
  const data = await getTechnologyData()

  // Fallback if empty
  const safeData = data || {
    title: "",
    subtitle: "",
    description: "",
    categories: []
  }

  return <TechnologyClient data={safeData} />
}
