import axios from "axios";

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!token) {
  throw new Error("API token is missing");
}

if (!baseUrl) {
  throw new Error("API URL is missing");
}

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const handleError = (error: unknown, context = 'request') => {
  console.error(`Error during ${context}:`, error);
  throw new Error(`Failed to ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`);
};

export async function getHomePage(): Promise<unknown> {
  return initPage({ mainPage: true });
}

export async function getPage(slug: string | string[] | null = null): Promise<unknown> {
  return initPage({ slug });
}

async function initPage({ mainPage = false, slug = null }: { mainPage?: boolean; slug?: string | string[] | null }): Promise<unknown> {
  try {
    const formattedSlug = Array.isArray(slug) ? slug[0] : slug;

    const filters = mainPage
      ? "filters[homepage][$eq]=true"
      : `filters[slug][$eq]=${formattedSlug}`;

    const query = `/pages?populate[1]=content_page&populate[2]=seo&${filters}`;

    const { data } = await api.get(query);
    return data;
  } catch (error) {
    handleError(error, mainPage ? 'fetch homepage' : 'fetch page');
  }
}
