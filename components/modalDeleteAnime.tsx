
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
    animeId:number
    animeName:string
    collection:string
}

export default function ModalDeleteAnime(modalProps:ModalProps) {

    const deleteAnime = () => {
        const tempCollections = JSON.parse(localStorage.getItem('collections'));
        console.log(modalProps.animeId)
        console.log(modalProps.collection)
        // Delete old key
        delete tempCollections[modalProps.collection][modalProps.animeId];
        console.log(tempCollections)
        localStorage.setItem('collections', JSON.stringify(tempCollections))
        modalProps.closeModal()
    }

    return (
      <ModalNew isOpen={modalProps.isOpen} closeModal={modalProps.closeModal}>
        <h3 className={styles.modaltitle}>Delete Anime : {modalProps.animeName}</h3>
         <FormControl fullWidth >
           <p>Are you sure want to delete this anime from collection?</p>
            <div className={styles.buttons}>
                <Button variant="outlined" color="error"  onClick={() => modalProps.closeModal()}
                sx={{width:100, marginRight:3}}>Cancle</Button>
                <Button variant="contained" color="error"  onClick={() => deleteAnime()}
                sx={{width:100}}>Delete</Button>
                
            </div>
         </FormControl>
      </ModalNew>
    );
  }