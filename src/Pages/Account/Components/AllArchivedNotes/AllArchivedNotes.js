import React from 'react';
import {usePreNavigate} from '~/Hooks';
import CreateNewNote from '~/Common/Buttons/CreateNewNote'
import {useNotes} from '~/Hooks';
import FormatNotes from '~/Common/Components/FormatNotes'
import {useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function AllArchivedNotes(){
    const navigate = usePreNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [allNotes, loading] = useNotes('https://note-taking-server.netlify.app/get-notes/archived');
    const [, changeClass] = useTheme(styles);

    const handleNavigate = () => {
        navigate('/account/untitled', {state: {note: {newNote: true}}});
    }

    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {tablet && 
                <h1 className={changeClass('notes_title')}>
                    Archived Notes
                </h1>}
            <p className={changeClass('notes_message')}>
                All your archived notes are stored here. You can restore or delete them anytime.
            </p>
            <FormatNotes allNotes={allNotes} loading={loading} emptyMessage={                
                <>
                    No notes have been archived yet. Move notes here for safekeeping, or&nbsp;
                    <a className={changeClass('link')} onClick={handleNavigate}>
                        create a new note.
                    </a>
                </>}/>
        </div>
    )
}

export default AllArchivedNotes;