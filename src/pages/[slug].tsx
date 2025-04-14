import { GetStaticProps } from 'next';
import { getPage } from "../app/api/pages";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Error from "next/error";
import PageProps from '@/app/interfaces/page';
import ContentPageItems from '@/components/layout/ContentPageItems';
import Layout from '@/components/layout/Layout';

interface PageWebProps {
  page: PageProps | null;
  error: string | null;
}

const PageWeb: React.FC<PageWebProps> = ({ page, error }) => {
  const router = useRouter();
  
  useEffect(() => {
    if (page?.attributes.homepage) {
      router.push('/');
    }
  }, [page, router]);
  
  if (error) {
    console.error(error);
    return <Error statusCode={500} />;
  }

  if (!page) {
    return <Error statusCode={404} />;
  }

  const isHomepage = page.attributes.homepage;

  if (isHomepage) {
    console.log("Homepage");
    router.push('/');
  }

  return (
    <Layout secondary_page={page.attributes.secondary_page}>
      <ContentPageItems blocks={page.attributes.content_page} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  
  try {
    const response = await getPage(slug);
    
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

export default PageWeb;
