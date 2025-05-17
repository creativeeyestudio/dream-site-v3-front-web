export async function getHomePage() {
  	return initPage('/home');
}

export async function getPage(slug: string) {
	return initPage(`/slug/${slug}`);
}

async function initPage(slug: string) {
	const token = process.env.NEXT_PUBLIC_API_TOKEN;
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	
	if (!token || !baseUrl) {
		console.error(`Token : ${token}`);
		console.error(`Base URL : ${baseUrl}`);
		throw new Error("API Credentials are missings")
	};

	const res = await fetch(`${baseUrl}/api/pages/${slug}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error(`La page n'a pas pu être trouvée`)

	const json = await res.json()
	return json;
}