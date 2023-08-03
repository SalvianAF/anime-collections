import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import Card from '../components/card';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from 'next/image';
import { Pagination, Button, Modal, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import ModalCollection from '../components/modalCollection';
// import LinearProgress from '@mui/material';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// export const getStaticProps: GetStaticProps = async (context) {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

interface AnimesProps {
  animes:[
    {
      __typename: string,
      id: number,
      coverImage: {
        __typename: string,
        extraLarge: string
      },
      averageScore:number
      title:{
        __typename:string,
        english:string,
        native:string
      }
    },
    
  ],
  page : {
    __typename:string,
    total:number,
  }
  
}

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export async function getStaticProps() { //for initial data
  const query = gql`
  query ($page: Int) { 
    Page(page: $page, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        coverImage {
          extraLarge
        }
        averageScore
        title {
          english
        }
      }
      pageInfo {
        total
      }
    }
  }
  `;

  const { data } = await client.query({
    query: query,
    variables: {
      page: 1
    }
  })

  // console.log(data.Page.pageInfo)

  return {
    props: {
      animes: data.Page.media,
      page: data.Page.pageInfo
    },
  };

}

export default function Home(animesProps:AnimesProps) { //Home(animes:AnimesProps[])
    const [data, setData] = useState(animesProps.animes)
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModal, setIsModal] = useState<boolean>(false)
    const [collections, setCollections] = useState([])
    const [collection, setCollection] = useState<string>("")
    const [searchAnime, setSearchAnime] = useState([])
    const [selectedAnime, setSelectedAnimes] = useState([])
    const [isAddCollection, setIsAddCollection] = useState<boolean>(false)
    
    // const temp = {image:"asdfasdf", title:"sadfasd"}
    // const [page, setPage] = useState(animesProps.page.total)

    const fetchAnimes = async(page) => { //update data on page changes
      // setIsLoading(true)
      const query = gql`
      query ($page: Int) { 
        Page(page: $page, perPage: 10) {
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            coverImage {
              extraLarge
            }
            averageScore
            title {
              english
            }
          }
          pageInfo {
            total
          }
        }
      }
      `;
    
      const { data } = await client.query({
        query: query,
        variables: {
          page: page
        }
      })

      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    
    setData(data.Page.media)
    //  setIsLoading(false)
    }

  

    return (
      <Layout siteTitle={'Anime Collections'}>
        {console.log(collections)}
        {/* {isLoading? 
        <div className={styles.loading}>
          <CircularProgress sx={{color:"#e89e00"}}/>
          <h4 style={{color:"#e89e00"}}>Getting Ready ...</h4>
        </div>
        : */}
        <div>
          <section className={utilStyles.headingMd}>
            <p>This is anime collections</p>
            <p>
              (This is a sample website - you’ll be building a site like this on{' '}
              <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
            </p>
            <h2 style={{textAlign:"center"}}>Trending Now</h2>
            <div className={styles.buttonadd}>
              <Button variant="contained" color="primary"  onClick={() => setIsModal(true)}>ADD ANIME</Button>
            </div>
          </section>
          <div className={styles.grid}>
            {data.map((anime) => (
              <Card score={anime.averageScore} image={anime.coverImage.extraLarge} title={anime.title.english} 
              id={anime.id} isScore={true}/>
            ))} 
          </div>
          <div className={styles.pagination}>
            <Pagination count={animesProps.page.total}  size="large" onChange={(e,value) => fetchAnimes(value)}/>
          </div>
      </div>
      <ModalCollection isOpen={isModal} closeModal={() => setIsModal(false)} isAnimeDisabled={false} detailAnime={""}/>
              {/* <FormControl fullWidth>
                {isAddCollection?
                  <TextField label=" Add New Collection" variant="outlined" onChange={(e) => setCollection(e.target.value)}/>
                :
                  <Autocomplete
                    options={collections}
                    id="clear-on-escape"
                    clearOnEscape
                    onChange={(e,data) => setCollection(data)}
                    renderInput={(params) => (
                      <TextField {...params} label="Collections" variant="outlined" />
                    )}
                  />
                }
                {isAddCollection?
                  <Button variant="contained" color="secondary"  onClick={() => setIsAddCollection(false)}>SEARCH COLLECTION</Button>
                :
                  <Button variant="contained" color="secondary"  onClick={() => {setIsAddCollection(true)}}>NEW COLLECTION</Button>
                }

                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchAnime}
                    getOptionLabel={(option) => option.title.english}
                    // defaultValue={[top100Films[13]]}
                    onChange={(e,data) => setSelectedAnimes(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Search Anime"
                        placeholder="Favorites"
                        onChange={(e) => fetchSearchAnime(e.target.value)}
                      />
                    )}
                  />

              </FormControl>
              <Button variant="contained" color="primary"  onClick={() => storeAnime()}>STORE ANIME</Button> */}
      {/* </ModalCollection> */}
      {/* <Modal
        open={isModal}
        onClose={() => setIsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={isModal}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal> */}
        {/* } */}
      </Layout>
    )
}
