import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageProps } from "@/interfaces/page";
import { notFound } from "next/navigation";

export default async function WebPage({params}: {params: Promise<{ slug: string }>}) {
	const { slug } = await params;
	
	try {
		const page: PageProps = await getPage(slug);

		return page && Array.isArray(page.content_page)
            ? <ContentPageItems blocks={page.content_page} />
            : notFound();
	} catch (error) {
		console.error(`Erreur lors du chargement de la page ${slug} :`, error);
        return notFound();
	}	
}
