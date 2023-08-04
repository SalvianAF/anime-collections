import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import { Button, CircularProgress} from '@mui/material';
import utilsStyles from '../../styles/utils.module.css';
import {useRouter} from 'next/router';
import Card from '../../components/card';
import styles from '../../styles/animeCollection.module.css';
import ModalEditCollection from '../../components/modalEditCollection';

export default function AnimeCollection() {
    const [animes, setAnimes] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const router = useRouter()
    const [colName, setColName] = useState(router.asPath.split('/collection/')[1].replaceAll("%20", " "))//get collection name from path

    const getAnimesCollection = () => {
        if (isRedirect){
            let tempCollections =  Object.keys(JSON.parse(localStorage.getItem('collections'))).reverse()
            router.push(tempCollections[0]) //get the updated collection name and change path
            setColName(tempCollections[0])
        }else{
            let tempCollections =  JSON.parse(localStorage.getItem('collections'))[colName];
            const tempAnimes = []
            if (tempCollections != null){
                Object.values(tempCollections).map((anime) => {
                    tempAnimes.push(anime)
                })
                setAnimes(tempAnimes)
            }
        }
        setIsLoading(false)
        setIsDelete(false)//reset to trigger rerendering after delete anime
    }

    useEffect(() => {
        getAnimesCollection()
    },[isModalEdit, isDelete]) //update data after edit or delete


    return (
        <>
        {isLoading? 
            <div className={utilsStyles.loading}>
                <CircularProgress sx={{color:"#e89e00"}}/>
                <h4 style={{color:"#e89e00"}}>Getting Ready ...</h4>
            </div>
        :
        <Layout siteTitle='Collections'>
             <h2>ANIME COLLECTION : "{colName}"</h2>
             <Button variant='contained' sx={{height:50, marginRight:2}}
                            onClick={() => {
                                setIsModalEdit(true)
                            }
                            }>EDIT NAME</Button>
             <div className={styles.animes}>
                {animes.length != 0?
                    animes.map((anime) : React.ReactNode => (
                        <div>
                            <Card title={anime.title.english} image={anime.coverImage.extraLarge} id={anime.id} score={0} isScore={false} 
                            isDelete={true} collection={colName} delete={() => setIsDelete(true)}/>
                        </div>
                    ))
                :<></>}
            </div>
            <ModalEditCollection isOpen={isModalEdit} closeModal={() => setIsModalEdit(false)} submit={() => {
                setIsModalEdit(false) 
                setIsRedirect(true)
            }} collectionName={colName} />
            
        </Layout>
        }
        </>
    );
  }