import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";

export default async function HomePage() {
    const page: PageProps = await getHomePage();
    
    return page
        ? <ContentPageItems blocks={page.content_page} /> 
        : notFound();
}