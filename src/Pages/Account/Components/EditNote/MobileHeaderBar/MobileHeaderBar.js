import React from 'react';
import { useLocation } from 'react-router-dom';
import DeleteNote from '~/Common/Components/DeleteNote';
import ArchiveNote from '~/Common/Components/ArchiveNote';
import RestoreNote from '~/Common/Components/RestoreNote/RestoreNote';
import {useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to continue implementing the buttons for this component (cancel and save)
//also, i may need to look more closely at the app.js file, i may be able to resuse the <AllMobileNotes/> component across all the routes in the app
// i may need to refactor <AllMobileNotes/> to make only one component render at one time

function MobileHeaderBar() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [, changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;


    return tablet ? 
        <section className={styles.header}>
            <button type='button' className={changeClass('header_goBack')}>
                <img className={changeClass('header_arrow')}/>
                Go Back
            </button>
            <DeleteNote/>
            {note.archived ? <RestoreNote id={note.id}/> : <ArchiveNote id={note.id}/>}
        </section>
    : <></>
}

export default MobileHeaderBar;