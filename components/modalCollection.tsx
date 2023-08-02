
import { Modal, Box, Fade, FormControl, Button, Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from "../apollo-client";

const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface ModalProps {
    isAnimeDisabled:boolean
    detailAnime: any
    isOpen:boolean
    closeModal:any
    // collections:[]
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex:99
  };


export default function ModalCollection(modalProps:ModalProps) {
    const [collection, setCollection] = useState("")
    const [collections, setCollections] = useState([])
    const [isAddCollection, setIsAddCollection] = useState<boolean>(false)
    const [selectedAnime, setSelectedAnimes] = useState([])
    const [searchAnime, setSearchAnime] = useState([])

    useEffect(() => {
        fetchCollections()
        checkIsAnimeDisabled()
    },[])

    const fetchCollections = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));
        if (!tempCollections){
            setIsAddCollection(true)
        }else{
            setIsAddCollection(false)
            setCollections(Object.keys(tempCollections))
        }
    }

    const checkIsAnimeDisabled = () => {
      if (modalProps.isAnimeDisabled){
        const tempAnime = {}
        tempAnime["coverImage"] = modalProps.detailAnime.coverImage
        tempAnime["id"] = modalProps.detailAnime.id
        tempAnime["title"] = modalProps.detailAnime.title
        // const tempAnimeList = [tempAnime]
        setSelectedAnimes([tempAnime])
      }
    }

    const fetchSearchAnime = async(title) => {
        const query = gql`
        query ($search: String) { 
          Page(page: 1, perPage: 10) {
            media(search: $search, type: ANIME) {
              coverImage {
                extraLarge
              }
              id
              title {
                english
              }
            }
          }
        }
        `;
      
        const { data } = await client.query({
          query: query,
          variables: {
            search: title
          }
        })
        setSearchAnime(data.Page.media)
        console.log(data.Page.media)
  
      }

      const storeAnime = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));
        const tempSelectedAnime = {}
        selectedAnime.map((anime) => {
          tempSelectedAnime[anime.id] = anime
        } )
        if (tempCollections){ // check if the collections exists
          if (collection in tempCollections){ // check if collection is in collections
            Object.entries(tempSelectedAnime).map(([key, anime]) => tempCollections[collection][key] = anime);
            localStorage.setItem('collections', JSON.stringify(tempCollections));
          }else{
            tempCollections[collection] = selectedAnime
            localStorage.setItem('collections', JSON.stringify(tempCollections));
          }
        }
        else{
          const newCollection = {[collection]:tempSelectedAnime}
          localStorage.setItem('collections', JSON.stringify(newCollection));
        }
        setIsAddCollection(false)
        modalProps.closeModal()
        
      }

    return (
        <Modal
            open={modalProps.isOpen}
            onClose={modalProps.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{paddingRight:0}}
            disableScrollLock={true}
            >
            <Fade in={modalProps.isOpen}>
                <Box sx={style}>
                    {/* <div>{modalProps.children}</div> */}
                    <FormControl fullWidth>
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
                        
                        {modalProps.isAnimeDisabled?
                            <TextField
                              disabled
                              variant="standard"
                              label={"Anime"}
                              placeholder="Favorites"
                              value={modalProps.detailAnime.title.english}
                              // onChange={(e) => fetchSearchAnime(e.target.value)}
                          />
                        :
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
                        }
                       

                    </FormControl>
                    <Button variant="contained" color="primary"  onClick={() => storeAnime()}>STORE ANIME</Button>
                </Box>
            </Fade>
        </Modal>
    );
  }