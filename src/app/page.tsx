import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Home() {
  const supportedLocales = ['fr', 'en', 'es', 'it', 'de'];
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  let locale = 'en'; // Default fallback

  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(',')
      .map((lang: string) => lang.split(';')[0].toLowerCase());

    // Find the first supported language
    const matchedLocale = preferredLanguages.find((lang: string) =>
      supportedLocales.includes(lang.slice(0, 2))
    );

    if (matchedLocale) {
      locale = matchedLocale.slice(0, 2);
    }
  }

  redirect(`/${locale}`);
}
