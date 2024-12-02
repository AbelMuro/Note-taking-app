import React, {useState, useEffect} from 'react';
import {useTheme} from '~/Hooks';
import { useNavigate } from 'react-router-dom';
import icons from '`/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { messageVariant } from './Variants';
import * as styles from './styles.module.css';

function DisplaySuccessMessage(){
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [link, setLink] = useState('');

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleNavigate = () => {
        if(link === 'Archived Notes')
            navigate('/account/archived-notes');
        else if(link === 'All Notes')
            navigate('/account');
    }

    const archiveSuccessMessage = () => {
        setMessage('Note archived.');
        setLink('Archived Notes');
        handleOpen();
    }

    const deleteSuccessMessage = () => {
        setMessage('Note deleted.');
        setLink('');
        handleOpen();
    }

    const updateSuccessMessage = () => {
        setMessage('Note saved successfully!');
        setLink('');
        handleOpen();
    }

    const restoredSuccessMessage = () => {
        setMessage('Note restored.');
        setLink('All Notes');
        handleOpen(); 
    }

    const newNoteSuccessMessage = () => {
        setMessage('Note created successfully!');
        setLink('All Notes');
        handleOpen(); 
    }

    useEffect(() => {
        document.addEventListener('note-archived', archiveSuccessMessage);
        document.addEventListener('note-deleted', deleteSuccessMessage);
        document.addEventListener('note-updated', updateSuccessMessage);
        document.addEventListener('note-restored', restoredSuccessMessage);
        document.addEventListener('note-created', newNoteSuccessMessage);

        return () => {
            document.removeEventListener('note-archived', archiveSuccessMessage);
            document.removeEventListener('note-deleted', deleteSuccessMessage);
            document.removeEventListener('note-updated', updateSuccessMessage);
            document.removeEventListener('note-restored', restoredSuccessMessage);
            document.removeEventListener('note-created', newNoteSuccessMessage);
        }
    }, [])

    useEffect(() => {
        if(!open) return;

        setTimeout(() => {
            setOpen(false);
        }, 5000)
    }, [open])

    return(
        <AnimatePresence>
            {open && 
                <motion.div 
                    className={changeClass('success_message')} variants={messageVariant}
                    initial={'hide'}
                    animate={'show'}
                    exit={'exit'}>
                        <img className={styles.success_icon} src={icons['checkmark']}/>     
                        {message}
                        <a className={changeClass('success_link')} onClick={handleNavigate}>
                            {link}
                        </a> 
                        <button className={changeClass('success_close')} onClick={handleOpen}/>
                </motion.div>}
        </AnimatePresence>
    )
}

export default DisplaySuccessMessage;