import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { Star } from '@mui/icons-material';

// const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface CardProps {
    score: number,
    image: string,
    title: string,
    id:number,
    isScore:boolean
}

export default function Card(cardProps:CardProps) {
    return (
        <div key={cardProps.title} className={styles.card}>
            <Link href={`/detail/${cardProps.id}`}>
           {/* <h5>{anime.coverImage}</h5> */}
           {/* <div> */}
           {cardProps.isScore?
            <h4 className={styles.score}><Star fontSize="medium" sx={{ color: "#e89e00"}}/>{cardProps.score}</h4>
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
    );
  }