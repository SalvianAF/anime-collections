
import { FormControl, Button, TextField} from '@mui/material';
import { useState } from 'react';
import ModalNew from "./modal"
import styles from './modal.module.css';


interface ModalProps {
    isOpen:boolean
    closeModal:any
}

export default function ModalAddCollection(modalProps:ModalProps) {
    const [newCollection, setNewCollection] = useState<string>("")

    const addCollection = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));
        if (tempCollections){ //check if collections exist
            if (Object.keys(tempCollections).includes(newCollection) == false){ //preventing overiding existing collection
                //assign new key
                tempCollections[newCollection] = {};
                localStorage.setItem('collections', JSON.stringify(tempCollections))
            }
        }else{
            const newCollectionData = {[newCollection]:{}}
            localStorage.setItem('collections', JSON.stringify(newCollectionData));
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