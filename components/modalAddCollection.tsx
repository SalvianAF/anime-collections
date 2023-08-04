
import { Modal, Box, Fade, FormControl, Button, Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from "../apollo-client";
import ModalNew from "./modal"
import styles from './modal.module.css';


const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface ModalProps {
    isOpen:boolean
    closeModal:any
    // collections:[]
}

export default function ModalAddCollection(modalProps:ModalProps) {
    const [newCollection, setNewCollection] = useState<string>("")

    const addCollection = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));

        if (Object.keys(tempCollections).includes(newCollection) == false){ //preventing overiding existing collection
            //assign new key
            // console.log(newCollection, Object.keys(tempCollections))
            tempCollections[newCollection] = {};
            localStorage.setItem('collections', JSON.stringify(tempCollections))
        }
        modalProps.closeModal()
    }


    return (
      <ModalNew isOpen={modalProps.isOpen} closeModal={modalProps.closeModal}>
        <h3 className={styles.modaltitle}>Add Collection</h3>
         <FormControl fullWidth >
            <TextField
                variant="standard"
                label="Collection Name"
                placeholder="Favorites"
                sx={{marginBottom:3}}
                onChange={(e) => setNewCollection(e.target.value)}
            />
            <div className={styles.buttons}>
                <Button variant="outlined" color="error"  onClick={() => modalProps.closeModal()}
                sx={{width:100, marginRight:3}}>Cancle</Button>
                <Button variant="contained" color="primary"  onClick={() => addCollection()}
                sx={{width:100}}>Add</Button>
                
            </div>
         </FormControl>
      </ModalNew>
    );
  }