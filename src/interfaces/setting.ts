import {PageDoc} from "@/interfaces/page";
import {ImageDataProps} from "@/interfaces/image";

export interface settingsProps {
    createdAt: string | Date
    updatedAt: string | Date
    maintenanceGroup : {
        maintenance: boolean
    }
    mediasGroup: {
        defaultImg: ImageDataProps
    }
    websiteConfigGroup: {
        logo: ImageDataProps
        favicon: ImageDataProps
        homepage: PageDoc
    }
}