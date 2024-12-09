import React, {useState, useEffect} from 'react';
import {useTheme} from '~/Hooks';
import { useNavigate } from 'react-router-dom';
import icons from '`/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { messageVariant } from './Variants';
import * as styles from './styles.module.css';


function DisplayMessage(){
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
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

    const displayMessage = (e) => {
        const message = e.detail.message;
        const link = e.detail.link;
        const error = e.detail.error;
        setMessage(message);
        setLink(link);
        setError(error);
        handleOpen();
    }


    useEffect(() => {
        document.addEventListener('display-message', displayMessage);

        return () => {
            document.removeEventListener('display-message', displayMessage);
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
                        <img className={styles.success_icon} src={error ? icons['errorMark'] : icons['checkmark']}/>     
                        {message}
                        <a className={changeClass('success_link')} onClick={handleNavigate}>
                            {link}
                        </a> 
                        <button className={changeClass('success_close')} onClick={handleOpen}/>
                </motion.div>}
        </AnimatePresence>
    )
}

export default DisplayMessage;