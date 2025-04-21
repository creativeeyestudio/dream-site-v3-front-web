import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode, noIntro: boolean }> = ({ children, noIntro }) => {
    return(
        <>
            <html>
                <body>
                    <Header noIntro={noIntro} />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </body>
            </html>
        </>
    )
}

export default Layout;