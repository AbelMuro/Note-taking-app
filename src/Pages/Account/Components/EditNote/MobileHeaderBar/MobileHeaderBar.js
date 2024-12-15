import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteNote from '~/Common/Buttons/DeleteNote';
import ArchiveNote from '~/Common/Buttons/ArchiveNote';
import RestoreNote from '~/Common/Buttons/RestoreNote';
import {useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function MobileHeaderBar() {
    const navigate = useNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const [, changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;

    const handleNavigate = () => {
        navigate('..');
    }

    return tablet ? 
        <section className={changeClass('header')}>
            <button type='button' className={changeClass('header_goBack')} onClick={handleNavigate}>
                <img className={changeClass('header_arrow')}/>
                Go Back
            </button>
            <div className={styles.header_buttons}>
                {!note.newNote && 
                    <>
                        <DeleteNote id={note.id}/>
                        {note.archived ? <RestoreNote id={note.id}/> : <ArchiveNote id={note.id}/>}            
                    </>}
                <button type='button' className={changeClass('header_cancel')} onClick={ handleNavigate}>
                    Cancel
                </button>
                <button className={styles.header_save}>
                    Save Note
                </button>                
            </div>
        </section>
    : <></>
}

export default MobileHeaderBar;