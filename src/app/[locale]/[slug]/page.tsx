import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageDoc } from "@/interfaces/page";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import { getSettings } from "@/api/settings";

export type PageParams = Promise<{
  locale: string;
  slug: string;
}>;

export default async function WebPage(props: { params: PageParams }) {
  const params = await props.params;
  const settings = await getSettings(params.locale);
  const page: PageDoc = await getPage(params.locale, params.slug);

  if (!page) notFound();

  if (settings.websiteConfigGroup.homepage === page) permanentRedirect(`/${params.locale}`)

  return <ContentPageItems blocks={page.content.layout} />;
}

// SEO dynamique
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const headersList = await headers();
  const { locale, slug } = params;

  const [settings, page] = await Promise.all([
    getSettings(locale),
    getPage(locale, slug),
  ]);

  if (!page) {
    return { title: "Page introuvable" };
  }

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title} | ${settings.websiteConfigGroup.title}`;
  const referer = headersList.get("referer") || "";

  return {
    title: fullTitle,
    description: description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: {
      title,
      description,
      url: referer,
      type: `website`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
