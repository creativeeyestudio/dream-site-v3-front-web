import { cache } from 'react';

async function connectToPayloadCMS(): Promise<string> {
    const res = await fetch(`${process.env.API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email:    process.env.API_USER,
            password: process.env.API_PASSWORD,
        }),
    });

    if (!res.ok) {
        const detail = await res.text().catch(() => '—');
        throw new Error(`Login Payload (${res.status})\n${detail}`);
    }

    const { token } = (await res.json()) as { token: string };
    return token;
}

/** Renvoie toujours *la même* Promise JWT pour toute la requête */
export const getToken = cache(connectToPayloadCMS);
