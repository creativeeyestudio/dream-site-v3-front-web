import { GetStaticPaths, GetStaticProps } from 'next';
import { getPage } from "../api/pages";
import Router from 'next/router';
import Error from "next/error";
import PageWebProps from '@/interfaces/page';
import ContentPageItems from '@/components/layout/ContentPageItems';
import Layout from '@/components/layout/Layout';
import HeadSeo from '@/components/seo/HeadSeo';

const PageWeb: React.FC<PageWebProps> = ({ page, error }) => {
  
  if (error || !page) {
    console.error(error || "Page non trouvée");
    return <Error statusCode={error ? 500 : 404} />;
  }

  const isHomepage = page.homepage;
  if (isHomepage) {
    Router.push('/')
  }

  return (
    <>
      <HeadSeo content={page.seo} type={'website'}></HeadSeo>
      <Layout noIntro={page.secondary_page}>
        <ContentPageItems blocks={page.content_page} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = ["qui-sommes-nous", "contact", "mentions-legales"]; // Ajoute ce que tu veux

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking', // ou false
  };
};


export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  
  try {
    const response = await getPage(slug);
    
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

export default PageWeb;
