import connectToPayloadCMS from "@/api/connectToPayloadCMS";

export async function getSettings() {
    const token = await connectToPayloadCMS();

    const apiSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/globals/settings?depth=2&draft=false&locale=fr`;

    const data = await fetch(apiSlug, {
        headers: { Authorization: `JWT ${token}` },
    })

    if (!data.ok) {
        console.error(`Settings not found`);
    }

    const settings = await data.json();
    return settings;
}