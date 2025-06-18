import { notFound } from "next/navigation";
import connectToPayloadCMS from "./connectToPayloadCMS";

export async function getHomePage(locale: string) {
  return initPage(locale);
}

export async function getPage(locale: string, slug: string) {
  return initPage(locale, slug);
}

async function initPage(locale: string, slug: string | null = null) {
  connectToPayloadCMS();
  
  const apiSlug = slug
    ? `pages?where[slug][equals]=${slug}&locale=${locale}`
    : `pages?where[config.homepage][equals]=true&locale=${locale}`;
  
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${apiSlug}`);
  
  if (!data.ok) notFound();
  
  const page = await data.json();
  return page;
}
