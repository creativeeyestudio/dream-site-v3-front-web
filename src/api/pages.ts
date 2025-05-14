export async function getHomePage() {
  	return initPage('/home', `La Homepage n'a pas pu être trouvée`);
}

export async function getPage(slug: string) {
	return initPage(`/slug/${slug}`, `La page n'a pas pu être trouvée`);
}

async function initPage(slug: string, errorMessage: string) {
	const token = process.env.NEXT_PUBLIC_API_TOKEN;
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	
	if (!token || !baseUrl) throw new Error("API Credentials are missings");

	const res = await fetch(`${baseUrl}/api/pages/${slug}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error(errorMessage)

	const json = await res.json()
	return json;
}