import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageContentProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { Metadata } from "next";

export type PageHomeParams = Promise<{
    locale: string;
}>;

export default async function HomePage(props: { params : PageHomeParams}) {
	const params = await props.params

    const page: PageContentProps = await getHomePage(params.locale);
    
    return page
        ? <ContentPageItems blocks={page.content_page} /> 
        : notFound();
}

// SEO dynamique
export async function generateMetadata(props: { params : PageHomeParams}): Promise<Metadata> {
	const params = await props.params
	const page: PageContentProps | null = await getHomePage(params.locale);

	if (!page) {
		return {
			title: "Page introuvable",
		};
	}

	return {
		title: page.seo?.meta_title ?? page.title,
		description: page.seo?.meta_desc ?? "",
	};
}