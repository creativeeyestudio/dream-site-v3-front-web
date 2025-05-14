import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const RootLayout: React.FC = () => {
    return(
        <html lang='fr'>
            <body>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout;