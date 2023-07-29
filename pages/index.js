import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from 'next/image';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// export const getStaticProps: GetStaticProps = async (context) {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }
export async function getStaticProps() {
  const query = gql`
  query ($page: Int) { 
    Page(page: $page, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME) {
        coverImage {
          extraLarge
        }
        episodes
        genres
        bannerImage
        seasonYear
        title {
          english
          native
        }
      }
    }
  }
  `;

  const { data } = await client.query({
    query: query,
    variables: {
      page: 1
    }
  })
 
  // console.log("KOKOs")
  return {
    props: {
      animes: data.Page.media,
    },
 };

}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   console.log(allPostsData)
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({animes}) { //Home({ allPostsData })
  return (
    <Layout home={true} siteTitle={'Anime Collections'}>
      {console.log(animes)}
      <Head>
        {/* <title>{siteTitle}</title> */}
        <title>Anime Collections</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>This is anime collections</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <div className={styles.grid}>
        {/* {countries.title.native} */}
        {animes.map((anime) => (
          <div key={anime.title.english} className={styles.card}>
           <h3>{anime.title.english}</h3>
           {/* <h5>{anime.coverImage}</h5> */}
           <Image
                src={anime.coverImage.extraLarge} // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
            />
          </div>
        ))} 
      </div>
    </Layout>
  )
}
