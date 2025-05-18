import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode,
    params: { lang: 'fr' | 'fr-FR' | 'en' }
}

export async function generateStaticParams() {
    return [
        {lang: 'fr'},
        {lang: 'fr-FR'},
        {lang: 'en'},
    ]
} 

export default async function RootLayout({ children, params }: RootLayoutProps) {
    return (
        <html lang={params.lang}>
        <body>
            <Header />
            <main>{children}</main>
            <Footer />
        </body>
        </html>
    );
}