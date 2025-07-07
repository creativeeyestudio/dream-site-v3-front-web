import { notFound } from "next/navigation";
import connectToPayloadCMS from "./connectToPayloadCMS";

export async function getPage(locale: string, slug: string) {
  const token = await connectToPayloadCMS();

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${slug}&locale=${locale}`;

  const data = await fetch(apiUrl, {
      // next: { revalidate: 300 },
      headers: { Authorization: `JWT ${token}` },
      // cache: 'no-store'
    },
  );

  if (!data.ok) {
    console.error(`Page not found with url : ${apiUrl}`);
    notFound();
  }

  const page = await data.json();
  return page?.docs[0];
}
