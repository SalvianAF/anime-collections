import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { Star, Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import ModalDeleteAnime from './modalDeleteAnime';
import { useState } from 'react';

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
           {cardProps.isScore?
            <h4 className={styles.score}><Star fontSize="medium" color='primary'/>{cardProps.score}</h4>
           :
           <></>}
           <Image
                src={cardProps.image} 
                height={350} 
                width={300}
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