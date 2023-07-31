import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

export async function getStaticProps() {
    const query = gql`
    query ($mediaId: Int) { 
        Media(id: $mediaId) {
            coverImage {
                extraLarge
              }
            bannerImage
            description
            duration
            episodes
            genres
            seasonYear
            title {
              english
              native
            }
        }
    }
    `;
  
    const { data } = await client.query({
      query: query,
      variables: {
        mediaId: 145064
      }
    })
  
    return {
      props: {
        anime: data.Media,
      },
   };
  
  }

export default function anime({anime}) {
    return (
        <Layout>
             <Head>
                <title>Anime Detail</title>
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            <h1>This is anime</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
            <Image
                src={anime.coverImage.extraLarge} // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
            />
        </Layout>
    );
  }