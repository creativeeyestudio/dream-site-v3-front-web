import Footer from "./Footer";
import Header from "./Header";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode, noIntro: boolean }> = ({ children, noIntro }) => {
    return(
        <>
            <Header noIntro={noIntro} />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;