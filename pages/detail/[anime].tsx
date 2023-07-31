import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Image from 'next/image';
import styles from '../../styles/anime.module.css';

// export async function getStaticPaths() {
//     const paths = getAllPostIds(); // isinya possible path
//     return {
//         paths,
//         fallback: false,
//     };
// }

// export async function getStaticProps({ params }) {
//     const postData = getPostData(params.id); //buat propsnya
//     return {
//       props: {
//         postData,
//       },
//     };
// }

// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }



// export async function getStaticProps() {
  // const router = useRouter()
  // const id = router.asPath.split('/detail/')[1] //get id from path
  // console.log(id)
  // const query = gql`
  // query ($mediaId: Int) { 
  //   Media(id: $mediaId) {
  //     bannerImage
  //     coverImage {
  //       extraLarge
  //     }
  //     duration
  //     description
  //     episodes
  //     genres
  //     popularity
  //     status
  //     title {
  //       english
  //       native
  //     }
  //   }
  // }
  // `;

  // const { data } = await client.query({
  //   query: query,
  //   variables: {
  //     mediaId: 146065
  //   }
  // })

  // return {
    // props: {
    //   anime: data.Media,
    // },
//  };

// }

interface DetailInterface {
    __typename: string,
    bannerImage: string,
    coverImage: {
        __typename: string,
        extraLarge: string
    },
    duration: number,
    description: string 
    episodes: number,
    genres: [],
    averageScore: number,
    status: string,
    title: {
        __typename: string,
        english: string,
        native: string
    }
  
}

export default function Anime() {
  //coba useeffect
  const [detail, setDetail]  = useState<DetailInterface>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const id = Number(router.asPath.split('/detail/')[1])//get id from path

  const fetchDetailAnime = async() => {
    const query = gql`
  query ($mediaId: Int) { 
    Media(id: $mediaId) {
      bannerImage
      coverImage {
        extraLarge
      }
      duration
      description
      episodes
      genres
      averageScore
      status
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
      mediaId: id
    }
  })

  setDetail(data.Media)
  setIsLoading(false)
  }

  useEffect(() => {
    fetchDetailAnime()
  },[id])

  return (
    <>
    {isLoading? <></>:
      <Layout home={false} siteTitle={detail.title.english}>
        {/* <h2>pathname:- {router.pathname}</h2> */}
        {}
        <div className={styles.bannercontainer}> 
          <Image
              src={detail.bannerImage} // Route of the image file
              // height={175} // Desired size with correct aspect ratio
              // width={1000} // Desired size with correct aspect ratio
              // objectFit="cover"
              // fill
              layout="fill" 
              className={styles.banner}
              alt="Your Name"
              // style={{}}
          />
        </div>
        <div className={styles.imagecontainer}> 
          <Image
              src={detail.coverImage.extraLarge} // Route of the image file
              // height={320} // Desired size with correct aspect ratio
              // width={270} // Desired size with correct aspect ratio
              // objectFit="cover"
              // fill
              layout="fill" 
              className={styles.image}
              alt="Your Name"
              // style={{}}
          />
        </div>
        <div className={styles.description}>
          <p dangerouslySetInnerHTML={{__html: detail.description}}></p>
        </div>
        <div className={styles.content}>
          <h3>TITLE : {detail.title.english}</h3>
          <h3>JAPAN : {detail.title.native}</h3>
          <h3>GENRES : {detail.genres.map((genre, idx) => {
            if (idx !== detail.genres.length-1){
              return genre + ", "
            }
            return genre
          }
          )}</h3>
          <h3>DURATION : {detail.duration} minutes</h3>
          <h3>EPISODES : {detail.episodes}</h3>
          <h3>SCORE : {detail.averageScore}</h3>
          <h3>STATUS : {detail.status}</h3>
          
        </div>
        {console.log(detail)}
        {/* <h2>query:- {router.query}</h2> */}
          {/* <h2>asPath:- {router.asPath}</h2> */}
      </Layout>
    
    }
    </>
  );
}