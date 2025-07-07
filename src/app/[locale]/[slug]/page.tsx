import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageDoc } from "@/interfaces/page";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getSettings } from "@/api/settings";

export type PageParams = Promise<{
  locale: string;
  slug: string;
}>;

export default async function WebPage(props: { params: PageParams }) {
  const params = await props.params;
  const settings = await getSettings(params.locale);
  const page: PageDoc = await getPage(params.locale, params.slug);

  if (settings?.maintenanceGroup?.maintenance) return redirect('/maintenance');

  if (!page) notFound();

  if (settings.identityGroup.homepage.slug === page.slug) return redirect(`/${params.locale}`);

  return <ContentPageItems blocks={page.content.layout} />;
}

// SEO dynamique
export async function generateMetadata(props: { params: PageParams }): Promise<Metadata> {
  const headersList = await headers();
  const params = await props.params;

  const [settings, page] = await Promise.all([
    getSettings(params.locale),
    getPage(params.locale, params.slug),
  ]);

  if (!page) {
    return { title: "Page introuvable" };
  }

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title} | ${settings.title}`;
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

