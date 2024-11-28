import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import * as styles from './styles.module.css';

function CreateNewNote() {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        if(pathname !== '/account' || pathname !== '/account/archived-notes')
            navigate('/account');
        else
            navigate(pathname)
    }


    return(
        <button type='button' className={styles.notes_button} onClick={handleNewNote}>
            + Create New Note
        </button>
    )
}

export default CreateNewNote;