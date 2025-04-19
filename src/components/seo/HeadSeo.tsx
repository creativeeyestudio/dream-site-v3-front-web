import Head from "next/head";
import PageProps from "@/app/interfaces/page";

interface HeadSeoComponentProps {
  content: PageProps;
  type: string;
  path: string;
}

const HeadSeo: React.FC<HeadSeoComponentProps> = ({ content, type, path }) => {
  const seoData = content.page.seo;

  return (
    <Head>
      <title>{seoData.meta_title}</title>
      <meta name="description" content={seoData.meta_desc} />
      <link rel="canonical" href={path} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.og_title ?? seoData.meta_title} />
      <meta property="og:description" content={seoData.og_desc ?? seoData.meta_desc} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={seoData.social_image?.url ?? ''} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.twitter_title} />
      <meta name="twitter:description" content={seoData.twitter_desc} />
      <meta name="twitter:image" content={seoData.twitter_image?.url ?? ''} />
    </Head>
  );
};

export default HeadSeo;
