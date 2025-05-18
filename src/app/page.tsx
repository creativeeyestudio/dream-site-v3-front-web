import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');

  const preferredLang = acceptLanguage?.split(',')[0].toLowerCase() || 'en';

  const locale = preferredLang.startsWith('fr') ? 'fr' : 'en';

  redirect(`/${locale}`);
}
