import React from 'react';
import CreateNewNote from '~/Common/Components/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes} from '~/Hooks';
import {useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to implement the search box and the
//im already done with the tags component, i will also need to add a loading icon for the EditNote component as well (save note button)

function AllNotes() {
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/notes');
    const [, changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;
  
    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;