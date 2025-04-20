import { getHomePage } from "../app/api/pages";
import { GetStaticProps } from "next";
import { usePathname } from "next/navigation";
import Error from "next/error";
import PageWebProps from "@/app/interfaces/page";
import Layout from "@/components/layout/Layout";
import ContentPageItems from "@/components/layout/ContentPageItems";
import HeadSeo from "@/components/seo/HeadSeo";

const PageHome: React.FC<PageWebProps> = ({ page, error }) => {

  const pathName = usePathname();
  
  if (error || !page) {
    console.error(error || "Page non trouvée");
    return <Error statusCode={error ? 500 : 404} />;
  }

  return (
    <>
      <HeadSeo content={PageHome.arguments} type={'website'} path={pathName ?? ''}></HeadSeo>
      <Layout noIntro={page.secondary_page}>
        <ContentPageItems blocks={page.content_page} />
      </Layout>
    </>
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