
import { getContactData } from "@/lib/get-contact-data"
import { ContactClient } from "@/components/contact-client"

export async function ContactSection() {
    const contactData = await getContactData()

    // Pass data or empty object if null (handled in client component defaults)
    return <ContactClient data={contactData || {}} />
}
