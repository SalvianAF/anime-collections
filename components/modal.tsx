
import { Modal, Box, Fade, FormControl, Button, Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from "../apollo-client";
import styles from './modal.module.css';

const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

interface ModalProps {
    isOpen:boolean
    closeModal:any
    children:any
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

  };


export default function ModalNew(modalProps:ModalProps) {

    return (
        <Modal
            open={modalProps.isOpen}
            onClose={modalProps.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{paddingRight:0}}
            disableScrollLock={true} //prevent add 17px margin right on body
            className={styles.modalcontent}
            >
            <Fade in={modalProps.isOpen}>
                <div className={styles.modal}>
                    <div>{modalProps.children}</div>
                </div>
            </Fade>
        </Modal>
    );
  }