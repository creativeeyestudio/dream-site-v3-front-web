import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageContentProps } from "@/interfaces/page";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export type PageParams = Promise<{
    locale: string;
    slug: string;
}>;

export default async function WebPage(props: { params : PageParams}) {
	const params = await props.params
	const page: PageContentProps | null = await getPage(params.locale, params.slug);

	if (!page) {
		notFound();
	}

	if (page.homepage) {
		redirect(`/${params.locale}`);
	}

	return <ContentPageItems blocks={page.content_page} />;
}

// SEO dynamique
export async function generateMetadata(props: { params : PageParams}): Promise<Metadata> {
	const params = await props.params
	const page: PageContentProps | null = await getPage(params.locale, params.slug);

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
