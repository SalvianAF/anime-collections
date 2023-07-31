import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import Card from '../components/card';
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

interface AnimesProps {
  animes:[
    {
      __typename: string,
      id: number,
      coverImage: {
        __typename: string,
        extraLarge: string
      },
      averageScore:number
      title:{
        __typename:string,
        english:string,
        native:string
      }
    },
    
  ]
  
}


export async function getStaticProps() {
  const query = gql`
  query ($page: Int) { 
    Page(page: $page, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        coverImage {
          extraLarge
        }
        averageScore
        title {
          english
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

  return {
    props: {
      animes: data.Page.media,
    },
 };

}

export default function Home(animesProps:AnimesProps) { //Home(animes:AnimesProps[])
  return (
    <Layout home={true} siteTitle={'Anime Collections'}>
      {console.log(animesProps)}
      
      <section className={utilStyles.headingMd}>
        <p>This is anime collections</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <div className={styles.grid}>
        {/* {countries.title.native} */}
        {animesProps.animes.map((anime) => (
          // <div key={anime.title.english} className={styles.card}>
          //  {/* <h5>{anime.coverImage}</h5> */}
          //  {/* <div> */}
          //  <h4 className={styles.score}>{anime.averageScore}</h4>
          //  <Image
          //       src={anime.coverImage.extraLarge} // Route of the image file
          //       height={350} // Desired size with correct aspect ratio
          //       width={350} // Desired size with correct aspect ratio
          //       alt="Your Name"
          //   />
          //   <h4 className={styles.titleanime}>{anime.title.english}</h4>
          // </div>
          <Card score={anime.averageScore} image={anime.coverImage.extraLarge} title={anime.title.english} id={anime.id}/>
        ))} 
      </div>
    </Layout>
  )
}
