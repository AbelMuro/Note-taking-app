import React, {useState} from 'react';
import {useTheme, useMediaQuery} from '~/Hooks'
import Dialog from '~/Common/Components/Dialog';
import {usePostRequest} from '~/Hooks';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function ArchiveNote({id}){
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [open, setOpen] = useState(false);
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [makeFetch] = usePostRequest();

    const handleOpen = () => {
        setOpen(!open);
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
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);  
        navigate('..');
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been archived', link: 'Archived Notes'}})
        document.dispatchEvent(eventCreated);
    }

    return <>
                {tablet ? 
                    <button type='button' className={changeClass('button_mobile')} onClick={handleOpen}>
                        <img className={changeClass('icon_mobile')}/>
                    </button> : 
                    <button type='button' className={changeClass('button')} onClick={handleOpen}>
                        <img className={changeClass('icon')}/>
                        Archive Note
                    </button> }
                    <Dialog 
                        open={open} 
                        loading={loading}
                        handleOpen={handleOpen} 
                        handleAction={handleArchive} 
                        title='Archive Note' 
                        desc='Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.' 
                        icon='icon-archive.svg'
                        confirm='Archive Note'
                        confirmButtonColor='#335CFF'
                        confimrButtonColorHover='#2643b8'
                        />
            </>   
}

export default ArchiveNote;