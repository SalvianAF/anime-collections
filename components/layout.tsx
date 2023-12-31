import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';


interface LayoutProps {
    children: any,
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
                    <h2>MY ANIME LIST</h2>
                </Link>
                <Link href="/collection" className={styles.nav}>
                    <Button color='secondary' variant='outlined'>
                        <h4 className={styles.menubtn}>MY COLLECTIONS</h4>
                    </Button>
                </Link>
            </div>
            <main className={styles.container}>{layoutProps.children}</main>
        </div>
    );
  }