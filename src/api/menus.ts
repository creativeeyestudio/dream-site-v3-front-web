const token = process.env.API_TOKEN;
const baseUrl = process.env.API_URL;

if (!token || !baseUrl) {
  console.error("API token or base URL is missing");
  // Optionnel : retourner null directement si config manquante
}

async function getMenu(menuId: string, locale: string) {
  try {
    const url = `${baseUrl}/api/navigation/render/${menuId}?type=TREE&locale=${locale}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // important pour Next.js App Router
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Menu Error (${res.status}): ${errorText}`);
      return null;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`Erreur lors du chargement du menu ${menuId} :`, error);
    return null;
  }
}

export default getMenu;
