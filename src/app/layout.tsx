import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return(
        <html lang='fr'>
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout;