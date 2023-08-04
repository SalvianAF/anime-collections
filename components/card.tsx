import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { Star, Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import ModalDeleteAnime from './modalDeleteAnime';
import { useState } from 'react';

// const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface CardProps {
    score: number,
    image: string,
    title: string,
    id:number,
    isScore:boolean,
    isDelete:boolean,
    collection:string,
    delete:any
}

export default function Card(cardProps:CardProps) {
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)

    return (
        <>
        <div key={cardProps.title} className={styles.card}>
            {cardProps.isDelete?
                <Button className={styles.delete} variant='outlined' color='error'
                onClick={() => {
                    setIsModalDelete(true)
                }}>
                    <Close fontSize="medium" color='error'/>
                </Button>
            :
            <></>
           }
            <Link href={`/detail/${cardProps.id}`}>
           {/* <h5>{anime.coverImage}</h5> */}
           {/* <div> */}
           {cardProps.isScore?
            <h4 className={styles.score}><Star fontSize="medium" color='primary'/>{cardProps.score}</h4>
           :
           <></>}
           <Image
                src={cardProps.image} // Route of the image file
                height={350} // Desired size with correct aspect ratio
                width={300} // Desired size with correct aspect ratio
                alt="Your Name"
            />
            <h4 className={styles.titleanime}>{cardProps.title}</h4>
            </Link>
          </div>
          <ModalDeleteAnime isOpen={isModalDelete} animeId={cardProps.id} collection={cardProps.collection} 
          animeName={cardProps.title} closeModal={() => {
            setIsModalDelete(false)
            cardProps.delete()
          }} />
        </>
    );
  }