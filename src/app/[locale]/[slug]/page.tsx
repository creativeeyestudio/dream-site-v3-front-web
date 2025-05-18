import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageProps } from "@/interfaces/page";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: {
        locale: string
		slug: string
    }
}

export default async function WebPage({ params }: Props) {
	const { slug, locale } = await params;
	const page: PageProps = await getPage(locale, slug);

	if (!page) notFound();
	
	if (page.homepage) redirect(`/`);
	
	return <ContentPageItems blocks={page.content_page} />;
}