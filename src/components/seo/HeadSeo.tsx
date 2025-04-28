import Head from "next/head";
import { SeoProps } from "@/interfaces/seo";

interface HeadSeoComponentProps {
  content: SeoProps;
  type: string;
}

const HeadSeo: React.FC<HeadSeoComponentProps> = ({ content, type }) => {

  return content ? (
    <Head>
      <title>{content.meta_title}</title>
      <meta name="description" content={content.meta_desc} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={content.og_title ?? content.meta_title} />
      <meta property="og:description" content={content.og_desc ?? content.meta_desc} />
      {content.social_image 
        ? <meta property="og:image" content={content.social_image.url} /> 
        : <></>}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.twitter_title ?? content.meta_title} />
      <meta name="twitter:description" content={content.twitter_desc ?? content.meta_desc} />
      {content.twitter_image 
        ? <meta name="twitter:image" content={content.twitter_image.url} />
        : <></>}
    </Head>
  ) : <></>;
};

export default HeadSeo;
