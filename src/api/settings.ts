import connectToPayloadCMS from "@/api/connectToPayloadCMS";
import { WebsiteProps } from "@/interfaces/website";

export async function getSettings(locale: string): Promise<WebsiteProps> {
    const token = await connectToPayloadCMS();

    const apiSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/settings/${process.env.SITE_ID}?depth=2&draft=false&locale=${locale}`;

    const data = await fetch(apiSlug, {
        headers: { Authorization: `JWT ${token}` },
    })

    if (!data.ok) console.error(`Settings not found`);

    const settings = await data.json();
    return settings;
}