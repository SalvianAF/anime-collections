
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
    collectionName:string
    // collections:[]
}

export default function ModalDeleteCollection(modalProps:ModalProps) {

    const deleteCollection = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));
 
        // Delete old key
        delete tempCollections[modalProps.collectionName];
        localStorage.setItem('collections', JSON.stringify(tempCollections))
        modalProps.closeModal()
    }

    return (
      <ModalNew isOpen={modalProps.isOpen} closeModal={modalProps.closeModal}>
        <h3 className={styles.modaltitle}>Delete Collection  : {modalProps.collectionName}</h3>
         <FormControl fullWidth >
           <p>Are you sure want to delete this collection?</p>
            <div className={styles.buttons}>
                <Button variant="outlined" color="error"  onClick={() => modalProps.closeModal()}
                sx={{width:100, marginRight:3}}>Cancle</Button>
                <Button variant="contained" color="error"  onClick={() => deleteCollection()}
                sx={{width:100}}>Delete</Button>
                
            </div>
         </FormControl>
      </ModalNew>
    );
  }