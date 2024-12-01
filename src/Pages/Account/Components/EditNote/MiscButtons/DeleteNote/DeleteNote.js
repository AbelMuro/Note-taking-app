import React, {useState} from 'react';
import {useUpdateNotes} from '~/Hooks';
import { ClipLoader } from 'react-spinners';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import {motion, AnimatePresence} from 'framer-motion';
import { overlayVariant, dialogVariant } from './Variants';
import * as styles from './styles.module.css';
import getRootofRoute from '~/Common/Functions/getRootofRoute';

function DeleteNote({id}) {
    const {tags} = useParams();
    const {pathname} = useLocation();
    const [makeFetch] = useUpdateNotes();
    const [loading, setLoading] = useState(false);
    const [,changeClass] = useTheme(styles);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        setLoading(true);
        const result = await makeFetch(`http://localhost:4000/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        setLoading && setLoading(false);
        setOpen && setOpen(false);
        const route = getRootofRoute(pathname);
        if(route === '/account/tags')    
            navigate(`${route}/${tags}`);
        else
            navigate(`${route}`)
        
        setTimeout(() => {
            alert(result)   
        }, 500);
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);     
        const eventTags = new Event('update-tags');
        document.dispatchEvent(eventTags);
    }

    return(
        <>
            <button type='button' className={changeClass('deleteButton')} onClick={handleOpen} style={loading ? {justifyContent: 'center'} : {}}>
                {!loading && <img className={changeClass('deleteButton_icon')}/>}
                {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Delete Note'}
            </button>      
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
                                    Delete Note
                                </h2>
                                <p className={changeClass('dialog_desc')}>
                                    Are you sure you want to permanently delete this note? This action cannot be undone.
                                </p>                        
                            </section>
                            <hr className={changeClass('dialog_line')}/>
                            <section className={styles.dialog_buttons}>
                                <button className={changeClass('dialog_cancel')} onClick={handleOpen}>
                                    Cancel
                                </button>
                                <button className={styles.dialog_delete} onClick={handleDelete}>
                                    {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Delete Note'}
                                </button>
                            </section>
                    </motion.dialog>
                </motion.div>}                
            </AnimatePresence>  

        </>

    )
}

export default DeleteNote;