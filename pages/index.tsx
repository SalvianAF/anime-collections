import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import Card from '../components/card';
import utilStyles from '../styles/utils.module.css';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Pagination, Button} from '@mui/material';
import { useState } from 'react';
import ModalCollection from '../components/modalCollection';

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
    
  ],
  page : {
    __typename:string,
    total:number,
  }
  
}


export async function getStaticProps() { //for initial data
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
      pageInfo {
        total
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
      page: data.Page.pageInfo
    },
  };

}

export default function Home(animesProps:AnimesProps) { 
    const [data, setData] = useState(animesProps.animes)
    const [isModal, setIsModal] = useState<boolean>(false)
    const [collections, setCollections] = useState([])
    const [collection, setCollection] = useState<string>("")
    const [searchAnime, setSearchAnime] = useState([])
    const [selectedAnime, setSelectedAnimes] = useState([])
    const [isAddCollection, setIsAddCollection] = useState<boolean>(false)

    const fetchAnimes = async(page) => { //update data on page changes
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
          pageInfo {
            total
          }
        }
      }
      `;
    
      const { data } = await client.query({
        query: query,
        variables: {
          page: page
        }
      })

      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    
    setData(data.Page.media)
    }

  

    return (
      <Layout siteTitle={'Anime Collections'}>
        <div>
          <section className={utilStyles.headingMd}>
            <h2 style={{textAlign:"center"}}>Trending Now</h2>
            <div className={styles.buttonadd}>
              <Button variant="contained" color="primary"  onClick={() => setIsModal(true)}>ADD COLLECTION</Button>
            </div>
          </section>
          <div className={styles.grid}>
              {data.map((anime) => (
                <Card score={anime.averageScore} image={anime.coverImage.extraLarge} title={anime.title.english} 
                id={anime.id} isScore={true} isDelete={false} collection='' delete={""}/>
              ))} 
          </div>
          <div className={styles.pagination}>
            <Pagination count={animesProps.page.total} color='primary' size="large" onChange={(e,value) => fetchAnimes(value)}/>
          </div>
        </div>
      <ModalCollection isOpen={isModal} closeModal={() => setIsModal(false)} isAnimeDisabled={false} detailAnime={""}/>
      </Layout>
    )
}
