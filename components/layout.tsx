import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';

const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
    children: any,
    // home: boolean,
    siteTitle: string
}

export default function Layout(layoutProps:LayoutProps) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                name="description"
                content="Learn how to build a personal website using Next.js"
                />
                <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(
                    layoutProps.siteTitle,
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={layoutProps.siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{layoutProps.siteTitle}</title>
            </Head>
            <div className={styles.header}>
                <Link href="/" className={styles.nav}>
                
                {/* {layoutProps.home ? (
                <>
                    <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilStyles.borderCircle}
                    height={144}
                    width={144}
                    alt=""
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
                ) : (
                <>
                    <Link href="/">
                    <Image
                        priority
                        src="/images/profile.jpg"
                        className={utilStyles.borderCircle}
                        height={108}
                        width={108}
                        alt=""
                    />
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                    <Link href="/" className={utilStyles.colorInherit}>
                        {name}
                    </Link>
                    </h2>
                </>
                )} */}
                    <h2>MY ANIME LIST</h2>
                </Link>
                <Link href="/collection" className={styles.nav}>
                    <Button color='secondary' variant='outlined'>
                        MY COLLECTIONS
                    </Button>
                    {/* <p>Collection</p> */}
                </Link>
            </div>
            <main className={styles.container}>{layoutProps.children}</main>
            {/* {!layoutProps.home && (
                <div className={styles.backToHome}>
                <Link href="/">← Back to home</Link>
                </div>
            )} */}
        </div>
    );
  }