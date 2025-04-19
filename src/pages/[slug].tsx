import { GetStaticProps } from 'next';
import { getPage } from "../app/api/pages";
import { useRouter } from 'next/router';
import Error from "next/error";
import PageWebProps from '@/app/interfaces/page';
import ContentPageItems from '@/components/layout/ContentPageItems';
import Layout from '@/components/layout/Layout';
import HeadSeo from '@/components/seo/HeadSeo';

const PageWeb: React.FC<PageWebProps> = ({ page, error }) => {
  
  const router = useRouter();
  
  if (error || !page) {
    console.error(error || "Page non trouvée");
    return <Error statusCode={error ? 500 : 404} />;
  }

  const isHomepage = page.homepage;
  if (isHomepage) {
    router.push('/');
  }

  return (
    <>
      <HeadSeo content={PageWeb.arguments} type={'website'} path={router.pathname ?? ''}></HeadSeo>
      <Layout noIntro={page.secondary_page}>
        <ContentPageItems blocks={page.content_page} />
      </Layout>
    </>
  );
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
