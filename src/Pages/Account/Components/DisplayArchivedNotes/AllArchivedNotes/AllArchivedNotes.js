import React from 'react';
import CreateNewNote from '~/Common/Components/CreateNewNote'
import {useNotes} from '~/Hooks';
import FormatNotes from '~/Common/Components/FormatNotes'
import {useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllArchivedNotes(){
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/archived');
    const [, changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;

    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            <p className={changeClass('notes_message')}>
                All your archived notes are stored here. You can restore or delete them anytime.
            </p> 
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllArchivedNotes;