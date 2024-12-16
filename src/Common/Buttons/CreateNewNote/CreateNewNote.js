import React from 'react';
import icons from './icons';
import {useMediaQuery} from '~/Hooks';
import {useLocation} from 'react-router-dom';
import {usePreNavigate} from '~/Hooks';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function CreateNewNote() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {pathname} = useLocation();
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();

    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        navigate('/account/untitled', {state: {note: {newNote: true}}});
    }

    return tablet ? 
        <button className={styles.mobile_button} onClick={handleNewNote}>
            <img className={styles.mobile_icon} src={icons['plus']}/>
        </button> :
        <div className={styles.container}>
            <button type='button' className={styles.button} onClick={handleNewNote}>
                + Create New Note
            </button>   
            {pathname === '/account/untitled' && <div className={changeClass('untitled')}>
                Untitled Note
            </div>}        
        </div>
    
}

export default CreateNewNote;