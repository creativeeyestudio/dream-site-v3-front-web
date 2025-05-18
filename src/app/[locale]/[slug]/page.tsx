import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageProps } from "@/interfaces/page";
import { notFound, redirect } from "next/navigation";

export default async function WebPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const page: PageProps = await getPage(slug);

	if (!page) notFound();
	
	if (page.homepage) redirect(`/`);
	
	return <ContentPageItems blocks={page.content_page} />;
}