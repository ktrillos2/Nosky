
import { getVideoData } from "@/lib/get-video-data"
import { VideoClient } from "@/components/video-client"

export async function VideoSection() {
    const data = await getVideoData()
    return <VideoClient data={data} />
}
