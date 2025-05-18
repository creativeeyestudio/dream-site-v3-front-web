import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";
import { Providers } from "./providers";

interface RootLayoutProps {
    children: ReactNode,
    params: { locale: string }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
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