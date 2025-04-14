import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/pages?populate=deep";

export async function getHomePage() {
    return initPage(true);
}

export async function getPage(slug: string | string[] | null = null) {
    return initPage(false, slug);
}

async function initPage(mainPage: boolean, slug: string | string[] | null = null) {
  try {
    const paramUrl = mainPage 
      ? '&filters[homepage][$eq]=true'
      : '&filters[slug][$eq]=' + slug;

    const res = await axios.get(apiUrl + paramUrl,  {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    });

    return res.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
