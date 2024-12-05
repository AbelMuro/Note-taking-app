import React, {useState} from 'react';
import {useTheme} from '~/Hooks'
import { ClipLoader } from 'react-spinners';
import {usePostRequest} from '~/Hooks';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';
import {AnimatePresence, motion} from 'framer-motion';
import { overlayVariant, dialogVariant} from './Variants';

function ArchiveNote({id, archived}){
    const [open, setOpen] = useState(false);
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [makeFetch] = usePostRequest();

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleNavigate = () => {
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);  
        navigate('..');
    }

    const handleArchive = async () => {
        setLoading(true);
        await makeFetch('http://localhost:4000/archive-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
        handleNavigate();
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been archived', link: 'Archived Notes'}})
        document.dispatchEvent(eventCreated);
    }

    const handleRestore = async () => {
        setLoading(true);
        await makeFetch('http://localhost:4000/restore-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
        handleNavigate();
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been restored', link: 'All Notes'}})
        document.dispatchEvent(eventCreated);
    }

    return <>
            {archived ? 
                <button className={changeClass('misc_button')} onClick={handleRestore} style={loading ? {justifyContent: 'center'} : {}}>
                    {!loading && <img className={changeClass('misc_icon')} id={styles.restore}/>}
                    {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Restore Note'}
                </button>  :         
                <button className={changeClass('misc_button')} onClick={handleOpen} style={loading ? {justifyContent: 'center'} : {}}>
                    <img className={changeClass('misc_icon')} id={styles.archive}/>
                    Archive Note
                </button>}   
                <AnimatePresence>
                    {open && <motion.div 
                        className={styles.overlay}
                        initial={'hide'}
                        animate={'show'}
                        exit={'exit'}
                        variants={overlayVariant}
                        >
                        <motion.dialog 
                            className={changeClass('dialog')} 
                            initial={'hide'}
                            animate={'show'}
                            exit={'exit'}
                            variants={dialogVariant}
                            open={true}>
                                <section className={styles.dialog_header}>
                                    <div className={changeClass('dialog_box')}>
                                        <img className={changeClass('dialog_icon')}/>
                                    </div>
                                    <h2 className={changeClass('dialog_title')}>
                                        Archive Note
                                    </h2>
                                    <p className={changeClass('dialog_desc')}>
                                        Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.
                                    </p>                        
                                </section>
                                <hr className={changeClass('dialog_line')}/>
                                <section className={styles.dialog_buttons}>
                                    <button className={changeClass('dialog_cancel')} onClick={handleOpen}>
                                        Cancel
                                    </button>
                                    <button className={styles.dialog_archive} onClick={handleArchive}>
                                        {loading ? <ClipLoader size='30px' color='#FFF'/> : 'Archive Note'}
                                    </button>
                                </section>
                        </motion.dialog>
                    </motion.div>}                
                </AnimatePresence>     
            </>   
}

export default ArchiveNote;