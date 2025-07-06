import connectToPayloadCMS from "@/api/connectToPayloadCMS";
import {settingsProps} from "@/interfaces/setting";

export async function getSettings(locale: string): Promise<settingsProps> {
    const token = await connectToPayloadCMS();

    const apiSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/globals/settings?depth=2&draft=false&locale=${locale}`;

    const data = await fetch(apiSlug, {
        headers: { Authorization: `JWT ${token}` },
    })

    if (!data.ok) {
        console.error(`Settings not found`);
    }

    const settings = await data.json();
    return settings;
}