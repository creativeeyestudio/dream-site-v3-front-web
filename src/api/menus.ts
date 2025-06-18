import connectToCMS from "./connectToPayloadCMS";

async function getMenu(menuId: string, locale: string) {
  connectToCMS();

  const apiSlug = `/navigation/${menuId}?locale=${locale}`;

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${apiSlug}`);

  if (!data.ok) throw new Error(`Error during loading ${menuId}`);

  const menu = await data.json();
  return menu;
}

export default getMenu;
