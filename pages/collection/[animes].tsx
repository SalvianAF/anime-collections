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
import ModalEditCollection from '../../components/modalEditCollection';

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

// export async function getStaticPaths() {
//     const collections = Object.keys(JSON.parse(localStorage.getItem('collections')))
//     const paths = []
//     collections.map((collection) => {
//         paths.push({params:{animes:collection}})
//     })
//     return {
//       paths,
//       fallback: false,
//     };
//   }

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
    // const [loading, setAnimes] = useState([])
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const router = useRouter()
    const [colName, setColName] = useState(router.asPath.split('/collection/')[1].replaceAll("%20", " "))//get collection name from path
    // colName = router.asPath.split('/collection/')[1].replaceAll("%20", " ")//get collection name from path

    const getAnimesCollection = () => {
        if (isRedirect){
            let tempCollections =  Object.keys(JSON.parse(localStorage.getItem('collections'))).reverse()
            // const tempObject.keys(JSON.parse(localStorage.getItem('collections'))).reverse())
            router.push(tempCollections[0]) //get the updated collection name and change path
            setColName(tempCollections[0])
        }else{
            let tempCollections =  JSON.parse(localStorage.getItem('collections'))[colName];
            // console.log(colName.replaceAll("%20", " "))
            // while (tempCollections == undefined){
            //     tempCollections =  JSON.parse(localStorage.getItem('collections'))[colName];
            //     console.log("p")
            // }
            console.log(Object.keys(JSON.parse(localStorage.getItem('collections'))))
            const tempAnimes = []
            if (tempCollections != null){
                Object.values(tempCollections).map((anime) => {
                    tempAnimes.push(anime)
                })
                setAnimes(tempAnimes)
                console.log("here")
            }
        }
        // tempCollections[newCollection]
        setIsDelete(false)//reset to trigger rerendering after delete anime
    }

    useEffect(() => {
        // router.push("/collection/"+colName)
        getAnimesCollection()
        console.log(colName)
    },[isModalEdit, isDelete])


    return (
        <Layout siteTitle='Collections'>
             <h2>ANIME COLLECTION : "{colName}"</h2>
             <Button variant='contained' sx={{height:50, marginRight:2}}
                            onClick={() => {
                                setIsModalEdit(true)
                            }
                            }>EDIT</Button>
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
                            <Card title={anime.title.english} image={anime.coverImage.extraLarge} id={anime.id} score={0} isScore={false} 
                            isDelete={true} collection={colName} delete={() => setIsDelete(true)}/>
                        </div>
                    ))
                :<></>}
            </div>
            <ModalEditCollection isOpen={isModalEdit} closeModal={() => {
                setIsModalEdit(false) 
                setIsRedirect(true)
            }} collectionName={colName} />
            
        </Layout>
    );
  }