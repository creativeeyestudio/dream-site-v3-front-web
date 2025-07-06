import connectToPayloadCMS from "./connectToPayloadCMS";

async function getMenu(menuId: string, locale: string) {
  const token = await connectToPayloadCMS();
  const apiSlug = `${encodeURIComponent(menuId)}?locale=${locale}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/navigation/${apiSlug}`,
    {
      next: { revalidate: 300 },
      headers: { Authorization: `JWT ${token}` },
    },
  );

  if (!res.ok) throw new Error(`Erreur lors du chargement du menu ${menuId}`);

  return res.json();
}

export default getMenu;
