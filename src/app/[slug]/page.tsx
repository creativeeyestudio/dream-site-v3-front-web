import { getPage } from "@/api/pages";
import { notFound, redirect } from "next/navigation";
import PageWebProps from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = ["qui-sommes-nous", "contact", "mentions-legales"];
  
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
    const page = await getPage(params.slug);
  
    if (!page) return {};

    return {
        title: page.seo?.metaTitle ?? page.title,
        description: page.seo?.metaDescription,
        openGraph: {
            title: page.seo?.metaTitle,
            description: page.seo?.metaDescription,
            images: [
                {
                    url: page.seo?.shareImage?.url,
                },
            ],
        },
    };
}

export default async function WebPage({ params }: { params: Params }) {
    const page: PageWebProps['page'] = await getPage(params.slug);

    if (!page) notFound();

    if (page.homepage) redirect('/');

    return (
        <>
            <ContentPageItems />
        </>
    );
};