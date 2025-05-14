import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import PageWebProps from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";

export async function generateMetadata() {
    const page = await getHomePage();
  
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

export default async function HomePage() {
    let page: PageWebProps['page'] | null = null;

    try {
        page = await getHomePage();
    } catch (error) {
        console.error("Erreur lors du chargement de la homepage :", error);
        notFound();
    }

    if (!page) notFound();

    return (
        <>
            <ContentPageItems />
        </>
    );
};