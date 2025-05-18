import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";

export default async function HomePage() {
    try {
        const page: PageProps = await getHomePage();

        console.log(page);
        
        return page
            ? <ContentPageItems blocks={page.content_page} /> 
            : notFound();

    } catch (error) {
        console.error("Erreur lors du chargement de la homepage :", error);
        return notFound();
    }
};