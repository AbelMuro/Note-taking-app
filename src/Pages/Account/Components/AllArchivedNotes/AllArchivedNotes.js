import React from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote'
import {useNotes} from '~/Hooks';
import FormatNotes from '~/Common/Components/FormatNotes'
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllArchivedNotes(){
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/archived');
    const [, changeClass] = useTheme(styles);

    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            <p className={changeClass('notes_message')}>
                All your archived notes are stored here. You can restore or delete them anytime.
            </p> 
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllArchivedNotes;