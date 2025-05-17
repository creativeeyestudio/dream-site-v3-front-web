import { getPage } from "@/api/pages";
import { notFound, redirect } from "next/navigation";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { Metadata } from "next";
import { PageProps } from "@/interfaces/page";

export default async function WebPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data: PageProps = await getPage(slug);

  if (!data) return notFound();

  if (data.homepage) return redirect("/");

  return <ContentPageItems blocks={data.content_page} />;
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
	const { slug } = await params;
	const data: PageProps = await getPage(slug);
	const page = data;

	return page ? {
		title: page.seo?.meta_title ?? page.title,
		description: page.seo?.meta_desc,
		openGraph: {
		title: page.seo?.meta_title,
		description: page.seo?.meta_title,
		images: [
			{
			url: page.seo?.social_image?.url || '',
			},
		],
		},
	} : {};
}

export async function generateStaticParams() {
	const slugs = ["qui-sommes-nous", "contact", "mentions-legales"];
	return slugs.map((slug) => ({ slug }));
}
