import React from 'react';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes} from '~/Hooks';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to create a loading screen with skeleton components, then i will need to implement the search box
//im already done with the tags component, i will also need to add a loading icon for the EditNote component as well (save note button)

function AllNotes() {
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/notes');
    const [, changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const {pathname, state} = useLocation();
    const note = state && state.note;
  
    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        navigate(pathname);
    }

    return(
        <div className={changeClass('notes')}>
            <button type='button' className={styles.notes_button} onClick={handleNewNote}>
                + Create New Note
            </button>
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;