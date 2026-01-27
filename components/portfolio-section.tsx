
import { getPortfolioData } from "@/lib/get-portfolio-data"
import { PortfolioClient } from "@/components/portfolio-client"

export async function PortfolioSection() {
  const data = await getPortfolioData()

  // Fallback if empty
  const safeData = data || {
    title: "",
    subtitle: "",
    description: "",
    items: []
  }

  return <PortfolioClient data={safeData} />
}
