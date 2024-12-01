import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function CreateNewNote() {
    const {pathname} = useLocation();
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();

    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        navigate('/account/untitled', {state: {note: {newNote: true}}});
    }

    return(
        <>
            <button type='button' className={styles.notes_button} onClick={handleNewNote}>
                + Create New Note
            </button>   
            {pathname === '/account/untitled' && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}        
        </>
    )
}

export default CreateNewNote;