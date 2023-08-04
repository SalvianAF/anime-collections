import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Image from 'next/image';
import styles from '../../styles/anime.module.css';
import ModalInput from '../../components/modalCollection';
import { CircularProgress, Button} from '@mui/material';
import ModalCollection from '../../components/modalCollection';
import path from 'path';
import Link from 'next/link';

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
//   const paths = {params: {
//     id: 100,
//   }}
//   // for (let i = 0; i < 5000; i++) {
//   //   paths.push(i)
//   // }
//   // const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }



// export async function getStaticProps() {
//   const router = useRouter()
//   const id = router.asPath.split('/detail/')[1] //get id from path
//   console.log(id)
//   const query = gql`
//     query ($mediaId: Int) { 
//       Media(id: $mediaId) {
//         bannerImage
//         coverImage {
//           extraLarge
//         }
//         id
//         duration
//         description
//         episodes
//         genres
//         averageScore
//         status
//         title {
//           english
//           native
//         }
//       }
//     }
//     `;

//   const { data } = await client.query({
//     query: query,
//     variables: {
//       mediaId: 146065
//     }
//   })

//   return {
//     props: {
//       anime: data.Media,
//     },
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
const DEFAULT_IMG = "/images/default.jpg"
const DEFAULT_BANNER = "/images/banner-default-new.jpg"

export default function Anime(anime) {
  //coba useeffect
  const [detail, setDetail]  = useState<DetailInterface>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [animeName, setAnimeName] = useState("")
  const [collections, setCollections] = useState([])
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
        id
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
  setAnimeName(data.Media.title.english)
  setIsLoading(false)
  }
  
  const checkCollections = () => {
    const temp = JSON.parse(localStorage.getItem("collections"))
    if (temp != undefined){
      // const tempCollections = Object.keys(temp)
      const tempCollections = []
      Object.entries(temp).map(([key, collection]) => {
        Object.values(collection).map((anime) => {
          if (anime.title.english === animeName){
            tempCollections.push(key)
          }
        })
      })
      // console.log("p")
      // console.log(tempCollections)
      setCollections(tempCollections)
    }
  }

  useEffect(() => {
    fetchDetailAnime()
    checkCollections()
  },[isModal, isLoading])

  return (
    <>
    {isLoading? 
      <div className={styles.loading}>
        <CircularProgress sx={{color:"#e89e00"}}/>
        <h4 style={{color:"#e89e00"}}>Getting Ready ...</h4>
      </div>
   :
      <Layout siteTitle={detail.title.english}>
        {/* <h2>pathname:- {router.pathname}</h2> */}
        {}
        <div className={styles.bannercontainer}>
          {detail.bannerImage != null?
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
          :
            <Image
              src={DEFAULT_BANNER} // Route of the image file
              // height={175} // Desired size with correct aspect ratio
              // width={1000} // Desired size with correct aspect ratio
              // objectFit="cover"
              // fill
              layout="fill" 
              className={styles.banner}
              alt="Your Name"
              // style={{}}
            />
          } 
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
           <Button color='primary' variant="outlined"  className={styles.btncollection}
           onClick={() => setIsModal(true)}>ADD TO COLLECTION</Button>
        </div>

        {/* <div className={styles.buttoncontainer}>
          <Button color='primary' variant="contained">ADD TO COLLECTION</Button>
        </div> */}
       
        <div className={styles.description}>
          {collections.length != 0 ?
            <div>
              <p>This anime already in collections : </p>
              {collections.map((collection) => (
                <Button variant='outlined' color='primary' sx={{marginRight:2}}>
                  <Link href={`/collection/${collection}`} color='primary'>
                    {collection}
                  </Link>
                </Button>
              ))}

            </div>
          :<></>}
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
        <ModalCollection isOpen={isModal} closeModal={() => setIsModal(false)} isAnimeDisabled={true} detailAnime={detail}/>
      </Layout>
    
    }
    </>
  );
}