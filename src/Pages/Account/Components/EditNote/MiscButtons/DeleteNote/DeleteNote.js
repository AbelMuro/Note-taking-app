import React, {useState} from 'react';
import Dialog from '~/Common/Components/Dialog';
import {usePostRequest} from '~/Hooks';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function DeleteNote({id}) {
    const [makeFetch] = usePostRequest();
    const [loading, setLoading] = useState(false);
    const [,changeClass] = useTheme(styles);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        setLoading(true);
        await makeFetch(`http://localhost:4000/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        setLoading && setLoading(false);
        setOpen && setOpen(false);
        navigate('..')        
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);     
        const eventTags = new Event('update-tags');
        document.dispatchEvent(eventTags);
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been deleted', link: ''}})
        document.dispatchEvent(eventCreated);
    }

    return(
        <>
            <button type='button' className={changeClass('deleteButton')} onClick={handleOpen} style={loading ? {justifyContent: 'center'} : {}}>
                <img className={changeClass('deleteButton_icon')}/>
                Delete Note
            </button>      
            <Dialog open={open}>
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
                        {loading ? <ClipLoader size='30px' color='#FFF'/> : 'Delete Note'}
                    </button>
                </section>
            </Dialog>
        </>

    )
}

export default DeleteNote;