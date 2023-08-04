import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Image from 'next/image';
import styles from '../../styles/anime.module.css';
import utilsStyles from '../../styles/utils.module.css';
import { CircularProgress, Button} from '@mui/material';
import ModalCollection from '../../components/modalCollection';
import Link from 'next/link';

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

// const DEFAULT_IMG = "/images/default.jpg"
const DEFAULT_BANNER = "/images/banner-default-new.jpg"

export default function Anime() {
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
      const tempCollections = []
      Object.entries(temp).map(([key, collection]) => {
        Object.values(collection).map((anime) => {
          if (anime.title.english === animeName){
            tempCollections.push(key)
          }
        })
      })
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
      <div className={utilsStyles.loading}>
        <CircularProgress sx={{color:"#e89e00"}}/>
        <h4 style={{color:"#e89e00"}}>Getting Ready ...</h4>
      </div>
   :
    <Layout siteTitle={detail.title.english}>
       <div className={styles.detail}>
        <div className={styles.bannercontainer}>
          {detail.bannerImage != null?
            <Image
              src={detail.bannerImage} 
              layout="fill" 
              className={styles.banner}
              alt="Your Name"
            />
          :
            <Image
              src={DEFAULT_BANNER} 
              layout="fill" 
              className={styles.banner}
              alt="Your Name"
            />
          } 
        </div>
        <div className={styles.imagecontainer}> 
          <Image
              src={detail.coverImage.extraLarge}
              layout="fill" 
              className={styles.image}
              alt="Your Name"
          />
           <Button color='primary' variant="outlined"  className={styles.btncollection}
           onClick={() => setIsModal(true)}>ADD TO COLLECTION</Button>
        </div>
       
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
      </div>
      <ModalCollection isOpen={isModal} closeModal={() => setIsModal(false)} isAnimeDisabled={true} detailAnime={detail}/>
    </Layout>
    
    }
    </>
  );
}