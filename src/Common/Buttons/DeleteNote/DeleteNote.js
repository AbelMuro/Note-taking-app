import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '~/Common/Components/Dialog';
import {usePostRequest, useMediaQuery, useTheme} from '~/Hooks';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function DeleteNote({id}) {
    const [tablet] = useMediaQuery('(max-width: 850px)');
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
        await makeFetch(`https://note-taking-server.netlify.app/.netlify/functions/app/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        setLoading && setLoading(false);
        setOpen && setOpen(false);    
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);     
        const eventTags = new Event('update-tags');
        document.dispatchEvent(eventTags);
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been deleted', link: ''}})
        document.dispatchEvent(eventCreated);
        navigate('..')    
    }

    return(
        <>
            {tablet ?             
                <button type='button' className={changeClass('deleteMobile')} onClick={handleOpen}>
                    <img className={styles.deleteMobile_icon}/>
                </button>  : 
                <button type='button' className={changeClass('deleteButton')} onClick={handleOpen}>
                    <img className={changeClass('deleteButton_icon')}/>
                    Delete Note
                </button>}      
            <Dialog 
                open={open} 
                loading={loading}
                handleOpen={handleOpen} 
                handleAction={handleDelete} 
                title='Delete Note' 
                desc='Are you sure you want to permanently delete this note? This action cannot be undone.' 
                icon='icon-delete.svg'
                confirm='Delete Note'
                confirmButtonColor='#FB3748'
                confimrButtonColorHover='#b11e2a'
                />
        </>
    )
}

export default DeleteNote;