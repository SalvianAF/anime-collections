
import { Modal, Box, Fade, FormControl, Button, Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from "../apollo-client";
import ModalNew from "./modal"

// export const siteTitle = 'Next.js Sample Website';

interface ModalProps {
    isAnimeDisabled:boolean
    detailAnime: any
    isOpen:boolean
    closeModal:any
    // collections:[]
}



export default function ModalCollection(modalProps:ModalProps) {
    const [selectedCollection, setSelectedCollection] = useState([])
    const [newCollection, setNewCollection] = useState("")
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
        console.log(tempSelectedAnime)
        if (tempCollections){ // check if the collections exists
          if (isAddCollection){ // check if add collection
            tempCollections[newCollection] = tempSelectedAnime
            localStorage.setItem('collections', JSON.stringify(tempCollections));
          }
          selectedCollection.map((collection) => {
            if (collection in tempCollections){ // check if collection is in collections
              Object.entries(tempSelectedAnime).map(([key, anime]) => tempCollections[collection][key] = anime); //adding anime to temp collection
              // console.log(tempCollections)
              localStorage.setItem('collections', JSON.stringify(tempCollections));
            }else{
              selectedCollection.map((collection) => {
                tempCollections[collection] = tempSelectedAnime
                localStorage.setItem('collections', JSON.stringify(tempCollections));
              })
            }
          })
        }
        else{
          // const newCollection = {}
          // selectedCollection.map((collection) => {
          //   newCollection[collection] = tempSelectedAnime
          // })
          const newCollectionData = {[newCollection]:tempSelectedAnime}
          localStorage.setItem('collections', JSON.stringify(newCollectionData));
        }
        setIsAddCollection(false)
        modalProps.closeModal()
        
      }

    const updateData = () => {
      setSearchAnime([])
      fetchCollections()
    }

    useEffect(() =>{
      updateData()
    },[modalProps.isOpen])

    return (
      <ModalNew isOpen={modalProps.isOpen} closeModal={modalProps.closeModal}>
        <FormControl fullWidth>
            {isAddCollection?
            <TextField label=" Add New Collection" variant="outlined" onChange={(e) => setNewCollection(e.target.value)}/>
            :
            <Autocomplete
                multiple
                options={collections}
                id="clear-on-escape"
                clearOnEscape
                onChange={(e,data) => setSelectedCollection(data)}
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
      </ModalNew>
    );
  }