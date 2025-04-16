import { getHomePage } from "../app/api/pages";
import { GetStaticProps } from "next";
import Error from "next/error";
import PageWebProps from "@/app/interfaces/page";
import Layout from "@/components/layout/Layout";
import ContentPageItems from "@/components/layout/ContentPageItems";

const PageHome: React.FC<PageWebProps> = ({ page, error }) => {
  
  if (error || !page) {
    console.error(error || "Page non trouvée");
    return <Error statusCode={error ? 500 : 404} />;
  }

  return (
    <Layout noIntro={page.secondary_page}>
      <ContentPageItems blocks={page.content_page} />
    </Layout>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await getHomePage();

    if (!response) {
      return { notFound: true }
    }
    
    return { 
      props: { page: response, error: null }, 
      revalidate: 60
    };
  } catch (error) {
    console.error("Erreur lors du chargement de la page:", error);
    return { props: { page: null, error: "Erreur lors du chargement de la page" + error } };
  }
};

export default PageHome;
