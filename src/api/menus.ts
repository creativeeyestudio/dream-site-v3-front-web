const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!token || !baseUrl) {
    console.error(`Token : ${token}`);
    console.error(`Base URL : ${baseUrl}`);
    throw new Error("API token is missing");
}

// const getMenu = async (menuId: string): Promise<unknown> => {
//     try {
//         const { data } = await api.get(`/navigation/render/${menuId}?type=TREE`);
//         return data;
//     } catch (error) {
//         handleError(error, `fetch menu "${menuId}"`);
//     }
// };

async function getMenu(menuId: string) {
    const res = await fetch(`${baseUrl}/api/navigation/render/${menuId}?type=TREE`, {
        headers: {
			Authorization: `Bearer ${token}`,
		},
    })

    if (!res.ok) throw new Error(`API : Le menu ${menuId} n'a pas pu être chargé`);
    
    const json = await res.json();
    
	return json;
}

export default getMenu;