import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
// import styles from '../styles/collections.module.css';
import {useRouter} from 'next/router';
import Card from '../../components/card';
import styles from '../../styles/animeCollection.module.css';

// export async function getStaticProps() {
//     const tempCollections = localStorage.getItem('collections')
//     const collections = Object.keys(tempCollections)
//     // console.log(s)

//     return {
//             props: {
//               collections: collections,
//             },
//          };
// }

// interface AnimesProps {
//     animes:[
//       {
//         __typename: string,
//         id: number,
//         coverImage: {
//           __typename: string,
//           extraLarge: string
//         },
//         title:{
//           __typename:string,
//           english:string,
//         }
//       },
      
//     ],

    
//   }

export default function AnimeCollection() {
    const [animes, setAnimes] = useState([])
    const router = useRouter()
    const colName = router.asPath.split('/collection/')[1].replaceAll("%20", " ")//get collection name from path

    const getAnimesCollection = () => {
        const tempCollections =  JSON.parse(localStorage.getItem('collections'))[colName];
        // console.log(colName.replaceAll("%20", " "))
        const tempAnimes = []
        Object.values(tempCollections).map((anime) => {
            tempAnimes.push(anime)
        })

        setAnimes(tempAnimes)
        // tempCollections[newCollection]
    }

    useEffect(() => {
        getAnimesCollection()
    },[])


    return (
        <Layout siteTitle='Collections'>
             <h2>ANIME COLLECTION : "{colName}"</h2>
             <div className={styles.animes}>
            {animes.length != 0?
                animes.map((anime) : React.ReactNode => (
                    <div>
                        {/* <h4>{anime.id}</h4>
                        <Image
                            src={anime.coverImage.extraLarge} // Route of the image file
                            height={300} // Desired size with correct aspect ratio
                            width={250} // Desired size with correct aspect ratio
                            alt="Your Name"
                        /> */}
                        <Card title={anime.title.english} image={anime.coverImage.extraLarge} id={anime.id} score={0} isScore={false}/>
                    </div>
                ))
            :<></>}
            </div>
        </Layout>
    );
  }