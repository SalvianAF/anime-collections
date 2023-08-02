import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import styles from '../styles/collections.module.css';

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

export default function AnimeCollection() {

    return (
        <Layout siteTitle='Collections'>
             <h2>ANIME COLLECTION</h2>
             
        </Layout>
    );
  }