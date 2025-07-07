import qs from 'qs';
import {PageDoc} from "@/interfaces/page";
import {SettingsProps} from "@/interfaces/settings";

/* ------------------------------------------------------------------
   Constantes
------------------------------------------------------------------ */
const SETTINGS_ID = process.env.SITE_ID!;
const CMS_URL = process.env.API_URL!;
const EMAIL     = process.env.API_USER!;
const PASSWORD  = process.env.API_PASSWORD!;

function headers(site: string) {
    return {
        'x-website': site, // optionnel : pour filtrer par domaine
        'Content-Type': 'application/json',
    }
}

/* ------------------------------------------------------------------
   Cache en mémoire du token (par instance de container)
------------------------------------------------------------------ */
interface CachedToken {
    token: string;
    exp  : number;        // timestamp (sec) du champ JWT exp
}
let cache: CachedToken | null = null;

/* ------------------------------------------------------------------
   1.  Récupérer / Rafraîchir le token
------------------------------------------------------------------ */
async function getAuthToken(): Promise<string> {
    const now = Date.now() / 1000;

    if (cache && cache.exp - 60 > now) return cache.token;

    const res  = await fetch(`${CMS_URL}/api/users/login`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });

    if (!res.ok) throw new Error('JWT login failed');

    const { token } = await res.json() as { token: string };

    const { exp } = jwtDecode<{ exp: number }>(token);
    cache = { token, exp };

    return token;
}

/* ------------------------------------------------------------------
   2.  Helper générique pour appeler Payload avec Auth + X‑Website
------------------------------------------------------------------ */
async function fetchCMS(
    path: string,
    {
        site,
        draft,
        init,
    }: {
        site?: string;
        draft?: boolean;
        init?: RequestInit;
    } = {},
) {
    const token   = await getAuthToken();
    const headers = new Headers(init?.headers);

    headers.set('Authorization', `JWT ${token}`);
    if (site) headers.set('x-website', site);
    if (draft) headers.set('draft', 'true');

    return fetch(`${CMS_URL}${path}`, {
        ...init,
        headers,
        next: init?.next ?? { revalidate: 0 },
    });
}

/* --------------------------------------------------
   Settings
-------------------------------------------------- */
export async function fetchSettings(): Promise<SettingsProps | null> {
    const res = await fetch(`${CMS_URL}/api/settings/${SETTINGS_ID}`);
    if (!res.ok) return null;
    return res.json();
}

/* --------------------------------------------------
   Pages
-------------------------------------------------- */
export async function fetchHomePage(site: string, locale: string) {
    const settings = await fetchSettings();
    if (!settings || settings.site !== site) return null;
    const url = new URL(`${CMS_URL}/api/pages/${settings.identityGroup.homepage.id}`);
    url.searchParams.set('locale', locale);

    const res = await fetch(url.toString(), {
        headers: { 'x-website': site },
        next   : { revalidate: 0 },
    });

    if (!res.ok) return null;
    return res.json();
}

export async function fetchPage(site: string, slug: string, locale: string): Promise<PageDoc | null> {
    const res = await fetch(`${CMS_URL}/api/pages?where[slug][equals]=${slug}&depth=2&locale=${locale}`, {
        headers: headers(site),
        next: { revalidate: 0 },
    })

    if (!res.ok) return null;

    const json = await res.json();
    return json.docs?.[0] ?? null;
}