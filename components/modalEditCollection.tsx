
import {FormControl, Button, TextField} from '@mui/material';
import { useState } from 'react';
import ModalNew from "./modal"
import styles from './modal.module.css';


const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface ModalProps {
    isOpen:boolean,
    closeModal:any,
    collectionName:string,
    submit:any, // for updating when edit in anime collection page
    // collections:[]
}

export default function ModalEditCollection(modalProps:ModalProps) {
    const [newCollection, setNewCollection] = useState<string>("")

    const editCollection = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));

        if (Object.keys(tempCollections).includes(newCollection) == false){ //prevent edit with same name as other collection
              //assign new key
            tempCollections[newCollection] = tempCollections[modalProps.collectionName];
    
            // Delete old key
            delete tempCollections[modalProps.collectionName];
            localStorage.setItem('collections', JSON.stringify(tempCollections))

        }
        modalProps.submit()
    }


    return (
      <ModalNew isOpen={modalProps.isOpen} closeModal={modalProps.closeModal}>
        <h3 className={styles.modaltitle}>Edit Collection : {modalProps.collectionName}</h3>
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
                <Button variant="contained" color="primary"  onClick={() => editCollection()}
                sx={{width:100}}>Edit</Button>
                
            </div>
         </FormControl>
      </ModalNew>
    );
  }