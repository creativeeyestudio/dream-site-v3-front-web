import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Providers } from "./providers";

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }>, }) {
    const { locale } = await params;
    
    return (
        <html lang={locale}>
            <body>
                <Providers locale={locale} />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}