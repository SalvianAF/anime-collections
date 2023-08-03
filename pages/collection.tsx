import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/layout';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import styles from '../styles/collections.module.css';
import ModalEditCollection from '../components/modalEditCollection';
import ModalDeleteCollection from '../components/modalDeleteCollection';
import ModalAddCollection from '../components/modalAddCollection';

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

export default function collection() {
    const [collections, setCollections] = useState([])
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
    const [collectionName, setCollectionName] = useState<string>("")

    useEffect(() => {
        getCollections()
    }, [isModalDelete, isModalEdit, isModalAdd])

    const getCollections = () => {
        const temp = JSON.parse(localStorage.getItem("collections"))
        const tempCollections = Object.keys(temp)
        console.log(tempCollections)
        setCollections(tempCollections.reverse())
    }


    return (
        <Layout siteTitle='Collections'>
            <div className={styles.collectiontitle}>
                <h2>MY COLLECTIONS</h2>
                <Button variant='contained' color="primary" sx={{height:50, marginTop:"15px"}}
                    onClick={() => {
                        setIsModalAdd(true)
                    }}>ADD NEW</Button>
            </div>
             <div className={styles.collections}>
                {collections.map((collection, idx) => (
                    // <div className={styles.collections}>
                    // <Link href={`/collection/${collection}`}>
                    //     <Button className={styles.btncollection} variant='contained' >
                    //         <h3>{collection}</h3>
                    //     </Button>
                    // </Link>
                    <div className={styles.collectionrow}>
                        <Link href={`/collection/${collection}`} className={styles.engtitle}>            
                                <h3>{idx+1}. &nbsp;{collection}</h3>
                        </Link>
                        <div className={styles.actions}>
                            <Button variant='contained' sx={{height:50, marginRight:2}}
                            onClick={() => {
                                setIsModalEdit(true)
                                setCollectionName(collection)}
                            }>EDIT</Button>
                            <Button variant='outlined' color="secondary" sx={{height:50}}
                            onClick={() => {
                                setIsModalDelete(true)
                                setCollectionName(collection)
                            }}>DELETE</Button>
                        </div>
                    </div>
                ))}
             </div>
             <ModalEditCollection isOpen={isModalEdit} closeModal={() => setIsModalEdit(false)} collectionName={collectionName}/>
             <ModalDeleteCollection isOpen={isModalDelete} closeModal={() => setIsModalDelete(false)} collectionName={collectionName} />
             <ModalAddCollection isOpen={isModalAdd} closeModal={() => setIsModalAdd(false)}/>
        </Layout>
    );
  }