import React, {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function FormatNotes({allNotes, loading}) {
    const [theme, changeClass] = useTheme(styles);
    const [selectedNote, setSelectedNote] = useState('');
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleStyles = (id) => {
        if(theme === 'light')
            return selectedNote === id ? {backgroundColor: '#F3F5F8'} : {};
        else
            return selectedNote === id ? {backgroundColor: '#232530'} : {}
    }

    const handleNote = (note) => {
        setSelectedNote(note.id);
        navigate(pathname, {state: {note} });
    } 

    useEffect(() => {
        setSelectedNote('');
    }, [allNotes])


    return loading ? 
                <div className={styles.loading}>
                    <ClipLoader size='35px' color='#335cff'/>
                </div> : 
                <div className={styles.notes_all}>
                    {allNotes && allNotes.map((currentNote) => {
                        const id = currentNote.id;
                        const title = currentNote.title;
                        const tags = currentNote.tags.split(',');
                        const date = currentNote.lastEdited;

                        return(
                            <article 
                                id={id === selectedNote ? 'selected' : ''}
                                style={handleStyles(id)}
                                className={changeClass('notes_note')} 
                                onClick={() => handleNote(currentNote)}
                                key={id}>
                                    <h2 className={changeClass('notes_title')}>
                                        {title}
                                    </h2>
                                    <div className={changeClass('notes_tags')}>
                                        {
                                            tags.map((tag) => {
                                                return(
                                                    <div className={styles.notes_tag} key={tag}>
                                                        {tag}
                                                    </div> 
                                                )
                                            })
                                        }
                                    </div>
                                    <p className={changeClass('notes_date')}>
                                        {date}
                                    </p>
                            </article>
                        )
                    })}                    
                </div>
            
    
}

export default FormatNotes;