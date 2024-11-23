import React from 'react';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllNotes({note, setNote}) {
    const [theme, changeClass] = useTheme(styles);

    const handleStyles = (id) => {
        if(theme === 'light')
            return note === id ? {backgroundColor: '#F3F5F8'} : {};
        else
            return note === id ? {backgroundColor: '#232530'} : {}
    }

    const handleNote = (note) => {
        setNote(note);
    }

    return(
        <div className={changeClass('notes')}>
            <button className={styles.notes_button}>
                + Create New Note
            </button>
            
            <article 
                style={handleStyles('id')}
                className={styles.notes_note} 
                onClick={() => handleNote('id')}>
                    <h2 className={changeClass('notes_title')}>
                        React Performance Optimization
                    </h2>
                    <div className={changeClass('notes_tags')}>
                        <div className={styles.notes_tag}>
                            Dev
                        </div>
                        <div className={styles.notes_tag}>
                            React
                        </div>
                    </div>
                    <p className={changeClass('notes_date')}>
                        29 Oct 2024
                    </p>
            </article>
        </div>
    )
}

export default AllNotes;