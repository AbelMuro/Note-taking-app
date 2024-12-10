import React from 'react';
import {useLocation} from 'react-router-dom';
import {useMediaQuery} from '~/Hooks';
import DeleteNote from '~/Common/Buttons/DeleteNote';
import ArchiveNote from '~/Common/Buttons/ArchiveNote';
import RestoreNote from '~/Common/Buttons/RestoreNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function MiscButtons() {
    const [,changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;
    if(note.newNote) return <></>;

    return(
        <section className={changeClass('container')}>
            {note.archived ? <RestoreNote id={note.id} /> : <ArchiveNote id={note.id}/>}
            <DeleteNote id={note.id}/>            
        </section>
    )
}

export default MiscButtons;