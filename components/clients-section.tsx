
import { getClientsData } from "@/lib/get-clients-data"
import { ClientsClient } from "@/components/clients-client"

export async function ClientsSection() {
  const data = await getClientsData()

  // Fallback if data is missing during dev/migration
  const safeData = data || {
    title: "",
    subtitle: "",
    items: []
  }

  return <ClientsClient data={safeData} />
}
