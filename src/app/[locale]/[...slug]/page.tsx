import { notFound }  from 'next/navigation';
import type { Metadata } from "next";
import { fetchPage } from "@/lib/cms";
import ContentPageItems from "@/components/layout/ContentPageItems";

/* --------------------------------------------------
   Types & helpers
-------------------------------------------------- */
export type PageParams = {
  locale: string;
  slug: string;
  headers: () => Headers;
};

/* --------------------------------------------------
   SEO dynamique
-------------------------------------------------- */
export async function generateMetadata(props: { params: PageParams }): Promise<Metadata> {
  const params = await props.params;
  const site = params.headers().get('x-website')!;

  const page = await fetchPage(site, params.slug, params.locale);
  if (!page) return { title: "Page introuvable" };

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title}`;

  return {
    title: fullTitle,
    description: description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: { title, description, url: '/', type: `website` },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* --------------------------------------------------
   Rendu de la page
-------------------------------------------------- */
export default async function WebPage({ params }: { params: PageParams }) {
  const site = params.headers().get('x-website')!;

  const page = await fetchPage(site, params.slug, params.locale);
  if (!page) return notFound();

  return <ContentPageItems blocks={page.content.layout} />
}