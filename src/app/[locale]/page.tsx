import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";

type Props = {
    params: {
        locale: string;
    }
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;

    const page: PageProps = await getHomePage(locale);
    
    return page
        ? <ContentPageItems blocks={page.content_page} /> 
        : notFound();
}