import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode,
    params: { locale: 'string' }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
    return (
        <html lang='fr'>
        <body>
            <Header />
            <main>{children}</main>
            <Footer />
        </body>
        </html>
    );
}