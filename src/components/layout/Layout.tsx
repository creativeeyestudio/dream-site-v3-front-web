import Footer from "./Footer";
import Header from "./Header";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode, secondary_page: boolean }> = ({ children, secondary_page }) => {
    return(
        <>
            <Header secondary_page={secondary_page} />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;