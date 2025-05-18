import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";
import { Providers } from "./[locale]/providers";

export type RootLayoutProps = Promise<{
    children: ReactNode,
    locale: string
}>

export default async function RootLayout(props: { params : RootLayoutProps }) {
    const params = await props.params
    
    return (
        <html lang={params.locale}>
        <body>
            <Providers locale={params.locale} />
            <Header />
            <main>{params.children}</main>
            <Footer />
        </body>
        </html>
    );
}