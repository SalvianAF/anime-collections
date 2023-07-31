import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';

// const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface CardProps {
    score: number,
    image: string,
    title: string,
    id:number,
}

export default function Card(cardProps:CardProps) {
    return (
        <div key={cardProps.title} className={styles.card}>
            <Link href={`/detail/${cardProps.id}`}>
           {/* <h5>{anime.coverImage}</h5> */}
           {/* <div> */}
           <h4 className={styles.score}>{cardProps.score}</h4>
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