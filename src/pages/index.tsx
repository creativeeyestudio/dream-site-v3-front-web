import { getHomePage } from "./api/pages";
import Error from "next/error";
import PageProps from "@/interfaces/page";
import Head from "next/head";
import WebPage from "@/app/_components/templates/WebPage";
import ContentPage from "@/app/_components/layouts/ContentPage";
import { GetStaticProps } from "next";

interface PageHomeProps {
  page: PageProps | null;
  error: string | null;
}

const PageHome: React.FC<PageHomeProps> = ({ page, error }) => {
  
  if (error) {
    return <Error statusCode={500} />;
  }

  if (!page) {
    console.error("Page non trouvée");
    return <Error statusCode={404} />;
  }

  const blocks = page.attributes.content_page;

  return (
    <ContentPage>
      <Head>
        <title>{page.attributes.meta_title}</title>
        <meta name="description" content={page.attributes.meta_desc} />
      </Head>
      <WebPage blocks={blocks} />
    </ContentPage>
  );
};

// Cette fonction sera exécutée côté serveur pour récupérer les données lors de la génération de la page
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await getHomePage();
    if (response) {
      return { props: { page: response.data[0], error: null } };
    } else {
      return { notFound: true }
    }
    
  } catch (error) {
    return { props: { page: null, error: "Erreur lors du chargement de la page" + error } };
  }
};

export default PageHome;
