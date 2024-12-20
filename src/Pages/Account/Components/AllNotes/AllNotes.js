import React from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';


function AllNotes() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [allNotes, loading] = useNotes('https://note-taking-server.netlify.app/.netlify/functions/app/get-notes/notes');
    const [, changeClass] = useTheme(styles);
    
  
    return (
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {
            tablet && 
                <h1 className={changeClass('notes_title')}>
                    All Notes
                </h1>   
            }
            <FormatNotes allNotes={allNotes} loading={loading} emptyMessage={'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.'}/>
        </div>
    )
}

export default AllNotes;