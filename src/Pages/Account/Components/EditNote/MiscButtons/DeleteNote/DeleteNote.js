import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import {motion, AnimatePresence} from 'framer-motion';
import { overlayVariant, dialogVariant } from './Variants';
import * as styles from './styles.module.css';

function DeleteNote({id}) {
    const [,changeClass] = useTheme(styles);
    const [open, setOpen] = useState(false);
    const {state} = useLocation();
    const note = state && state.note;

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        try{
            const response = await fetch(`http://localhost:4000/delete-note:${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })      
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                alert(result);
                const event = new Event('notes-updated');
                document.dispatchEvent(event);
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
                navigate('/');
                setTimeout(() => {
                    alert(message);
                }, 500)
            }
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
                alert(message);
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server Error has occurred');
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later')
        }
    }

    return(
        <>
            <button type='button' className={changeClass('deleteButton')} onClick={handleOpen} disabled={note ? false : true}>
                <img className={changeClass('deleteButton_icon')}/>
                Delete Note
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
                                    Delete Note
                                </button>
                            </section>
                    </motion.dialog>
                </motion.div>}                
            </AnimatePresence>  

        </>

    )
}

export default DeleteNote;