import connectToPayloadCMS from "@/api/connectToPayloadCMS";
import { WebsiteProps } from "@/interfaces/website";

export async function getSettings(locale: string): Promise<WebsiteProps> {
    const token = await connectToPayloadCMS();
    
    const url = new URL(
        `/api/settings/${process.env.SITE_ID}`, 
        process.env.NEXT_PUBLIC_API_URL
    );
    url.searchParams.set("depth", "2");
    // url.searchParams.set("draft", "false");
    url.searchParams.set("locale", locale);

    const res = await fetch(url.href, {
        headers: {
        Authorization: `JWT ${token}`,          // ←  le bon préfixe
        Accept: "application/json",
        },
        cache: "no-store",                        // évite de servir un 403 mis en cache
    });

    if (!res.ok) {
        const detail = await res.text().catch(() => "—");
        throw new Error(`Settings (${res.status})\n${detail}`);
    }

    return res.json() as Promise<WebsiteProps>;
}