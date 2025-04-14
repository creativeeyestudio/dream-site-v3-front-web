import { getHomePage } from "../app/api/pages";
import { GetStaticProps } from "next";
import Error from "next/error";
import PageProps from "@/app/interfaces/page";
import Layout from "@/components/layout/Layout";
import ContentPageItems from "@/components/layout/ContentPageItems";

interface PageHomeProps {
  page: PageProps | null;
  error: string | null;
}

const PageHome: React.FC<PageHomeProps> = ({ page, error }) => {
  
  if (error || !page) {
    console.error(error || "Page non trouvée");
    return <Error statusCode={error ? 500 : 404} />;
  }

  return (
    <Layout secondary_page={page.attributes.secondary_page}>
      <ContentPageItems blocks={page.attributes.content_page} />
    </Layout>
  );
};

// Cette fonction sera exécutée côté serveur pour récupérer les données lors de la génération de la page
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await getHomePage();

    if (!response || !response.data || response.data.length === 0) {
      return { notFound: true }
    }

    const page = response.data[0];
    
    return { 
      props: { page: page, error: null }, 
      revalidate: 60
    };
  } catch (error) {
    console.error("Erreur lors du chargement de la page:", error);
    return { props: { page: null, error: "Erreur lors du chargement de la page" + error } };
  }
};

export default PageHome;
