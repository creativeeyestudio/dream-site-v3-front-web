import { Metadata } from "next";
import {fetchHomePage} from "@/lib/cms";
import ContentPageItems from "@/components/layout/ContentPageItems";

export type PageHomeParams = {
  locale: string;
  slug: string;
  headers: () => Headers;
};

/* --------------------------------------------------
   SEO dynamique
-------------------------------------------------- */
export async function generateMetadata(props: { params: PageHomeParams }): Promise<Metadata> {
  const params = await props.params;
  const site = params.headers().get('x-website')!;
  const page = await fetchHomePage(site, params.locale);

  if (!page) return { title: 'Page introuvable' };

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title}`;

  return {
    title       : fullTitle,
    description : description ?? '',
  };
}

/* --------------------------------------------------
   Rendu de la page
-------------------------------------------------- */
export default async function HomePage(props: { params: PageHomeParams }) {
  const params = await props.params;
  const site = params.headers().get('x-website')!;
  const page = await fetchHomePage(site, params.locale);

  if (!page) return notFound();

  return <ContentPageItems blocks={page.content.layout} />;
}