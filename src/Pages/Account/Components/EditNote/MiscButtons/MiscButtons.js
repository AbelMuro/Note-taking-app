import React from 'react';
import ArchiveNote from './ArchiveNote';
import {useLocation} from 'react-router-dom';
import DeleteNote from './DeleteNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function MiscButtons() {
    const [,changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;

    return(
        <section className={changeClass('container')}>
            {!note.newNote && 
            <>
                <ArchiveNote id={note.id} archived={note.archived} />
                <DeleteNote id={note.id}/>            
            </>}
        </section>
    )
}

export default MiscButtons;