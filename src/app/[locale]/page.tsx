import {notFound} from "next/navigation";
import ContentPageItems from "@/components/layout/ContentPageItems";
import {Metadata} from "next";
import {headers} from "next/headers";
import {getSettings} from "@/api/settings";

export type PageHomeParams = Promise<{
  locale: string;
}>;

export default async function HomePage(props: { params: PageHomeParams }) {
  const params = await props.params;
  const settings = await getSettings(params.locale);
  const homepage = settings.websiteConfigGroup.homepage;

  return homepage
      ? <ContentPageItems blocks={homepage.content.layout} />
      : notFound();
}

// SEO dynamique
export async function generateMetadata({ params }: { params: PageHomeParams }): Promise<Metadata> {
  const headersList = await headers();
  const { locale } = params;

  const settings = await getSettings(locale);
  const page = settings.websiteConfigGroup.homepage;

  if (!page) {
    return { title: "Page introuvable" };
  }

  const { title, description } = page.meta;
  const siteTitle = settings.websiteConfigGroup.title;
  const fullTitle = `≻ ${title ?? siteTitle}`;
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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
