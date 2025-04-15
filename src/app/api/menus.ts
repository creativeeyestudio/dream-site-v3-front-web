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

const handleError = (error: unknown, context = 'fetch menu') => {
    if (axios.isAxiosError(error)) {
        console.error(`${context} – Axios error:`, error.response?.data || error.message);
    } else {
        console.error(`${context} – Unexpected error:`, error);
    }
    throw new Error(`${context} failed`);
};

const getMenu = async (menuId: string): Promise<unknown> => {
    try {
        const { data } = await api.get(`/navigation/render/${menuId}?type=TREE`);
        return data;
    } catch (error) {
        handleError(error, `fetch menu "${menuId}"`);
    }
};

export default getMenu;