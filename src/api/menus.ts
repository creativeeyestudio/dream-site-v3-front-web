import {getToken} from "./connectToPayloadCMS";
import { cache } from 'react';

export const getMenu = cache((menuId: string, locale: string) => {
  const apiSlug = `${menuId}?locale=${locale}`;

  const res = await fetch(
    `${process.env.API_URL}/api/navigation/${apiSlug}`,
    {
      // next: { revalidate: 300 },
      headers: { Authorization: `JWT ${await getToken()}` },
    },
  );

  if (!res.ok) throw new Error(`Erreur lors du chargement du menu ${menuId}`);

  return res.json();
})

export default getMenu;
