import { ImageDataProps } from "./image"
import { PageDoc } from "./page"

export interface SettingsProps {
    createdAt: string
    updatedAt: string
    title: string
    identityGroup: {
        logo: ImageDataProps
        favicon: ImageDataProps
        homepage: PageDoc
    }
    maintenanceGroup: {
        maintenance: boolean
    }

} 