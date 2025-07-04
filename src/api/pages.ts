import { notFound } from "next/navigation";
import connectToPayloadCMS from "./connectToPayloadCMS";

export async function getPage(locale: string, slug: string) {
  const token = await connectToPayloadCMS();

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${slug}&[config.published][equals]=2&locale=${locale}`;

  const data = await fetch(apiUrl, {
      headers: { Authorization: `JWT ${token}` },
    },
  );

  if (!data.ok) {
    console.error(
        `Page not found with url : ${process.env.NEXT_PUBLIC_API_URL}/api/pages${slug}`,
    );
    notFound();
  }

  const page = await data.json();
  return page?.docs[0];
}
