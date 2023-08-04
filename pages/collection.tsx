import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';
import utilsStyles from '../styles/utils.module.css';
import { useEffect, useState } from 'react';
import { Button, CircularProgress} from '@mui/material';
import styles from '../styles/collections.module.css';
import ModalEditCollection from '../components/modalEditCollection';
import ModalDeleteCollection from '../components/modalDeleteCollection';
import ModalAddCollection from '../components/modalAddCollection';

const DEFAULT_IMG = "/images/default.jpg"

export default function collection() {
    const [collections, setCollections] = useState([])
    const [firstImg, setFirstImg] = useState([])
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
    const [collectionName, setCollectionName] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getCollections()
    }, [isModalDelete, isModalEdit, isModalAdd, isLoading]) //update data after modal

    const getCollections = () => {
        const temp = JSON.parse(localStorage.getItem("collections"))
        if (temp != undefined){
            const tempCollections = Object.keys(temp)
            setCollections(tempCollections.reverse()) //the newest is in the start
            const tempFirstImg = []
            tempCollections.map((col) => {// get first anime image
                const animes:any = Object.values(temp[col]) [0]
                if (animes != undefined){       
                    const img = animes.coverImage.extraLarge
                    tempFirstImg.push(img)
                }else{
                    tempFirstImg.push(DEFAULT_IMG)
                }
            })
            setFirstImg(tempFirstImg)
        }
        setIsLoading(false)
    }


    return (
        <>
         {isLoading? 
            <div className={utilsStyles.loading}>
                <CircularProgress sx={{color:"#e89e00"}}/>
                <h4 style={{color:"#e89e00"}}>Getting Ready ...</h4>
            </div>
        :
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
                    <div className={styles.collectionrow}>
                        <Link href={`/collection/${collection}`} className={styles.collection}>    
                                <Image
                                    src={firstImg[idx]} 
                                    height={100}
                                    width={80} 
                                    alt="Your Name"
                                />        
                                <h3 className={styles.colname}>{collection}</h3>
                        </Link>
                        <div className={styles.actions}>
                            <Button variant='contained' sx={{height:50, marginRight:2}}
                            onClick={() => {
                                setIsModalEdit(true)
                                setCollectionName(collection)}
                            }>EDIT</Button>
                            <Button variant='outlined' color="error" sx={{height:50}}
                            onClick={() => {
                                setIsModalDelete(true)
                                setCollectionName(collection)
                            }}>DELETE</Button>
                        </div>
                    </div>
                ))}
            </div>
            <ModalEditCollection isOpen={isModalEdit} closeModal={() => setIsModalEdit(false)} collectionName={collectionName} submit={() => setIsModalEdit(false)}/>
            <ModalDeleteCollection isOpen={isModalDelete} closeModal={() => setIsModalDelete(false)} collectionName={collectionName} />
            <ModalAddCollection isOpen={isModalAdd} closeModal={() => setIsModalAdd(false)}/>
        </Layout>
        }
        </>
       
    );
  }