import React, {useState, useEffect} from 'react';
import LoadingNotes from './LoadingNotes'
import {useParams, useLocation} from 'react-router-dom';
import {usePreNavigate} from '~/Hooks';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function FormatNotes({allNotes, loading, emptyMessage}) {
    const {pathname, state} = useLocation();
    const id = state && state.note && state.note.id;
    const {note, archiveNote, tag} = useParams();
    const [theme, changeClass] = useTheme(styles);
    const [selectedNote, setSelectedNote] = useState('');
    const navigate = usePreNavigate();

    const handleStyles = (id) => {
        if(theme === 'light')
            return selectedNote === id ? {backgroundColor: '#F3F5F8'} : {};
        else
            return selectedNote === id ? {backgroundColor: '#232530'} : {};
    }

    const handleNote = (note) => {
        navigate(`${note.title}`, {state: {note}});
    } 

    useEffect(() => {
        setSelectedNote('');
    }, [allNotes])

    useEffect(() => {
        if(!note && !archiveNote && !tag)
            setSelectedNote('');
    }, [note, archiveNote, tag])

    useEffect(() => {
        if(!id) return;
        setSelectedNote(id);
    }, [pathname, id])

    return loading ? 
                <LoadingNotes/> : 
                <div className={styles.notes_all}>
                    {(allNotes && allNotes.length !== 0) ? allNotes.map((currentNote, i) => {
                        const id = currentNote.id;
                        const title = currentNote.title;
                        const tags = currentNote.tags.split(',');
                        const date = currentNote.lastEdited;

                        return(
                            <React.Fragment key={`${id}`}>
                                <article 
                                    id={id === selectedNote ? 'selected' : ''}
                                    style={handleStyles(id)}
                                    className={changeClass('notes_note')} 
                                    onClick={() => handleNote(currentNote)}>
                                        <h2 className={changeClass('notes_title')}>
                                            {title}
                                        </h2>
                                        <div className={changeClass('notes_tags')}>
                                            {
                                                tags.map((tag, i) => {
                                                    return(
                                                        <div className={styles.notes_tag} key={`${tag} ${i}`}>
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
                                {i !== allNotes.length - 1 && <hr className={changeClass('verticalLine')}/> }                 
                            </React.Fragment>
                        )
                    }) : <p className={changeClass('message')}>
                            {emptyMessage}
                        </p>}                    
                </div>
            
    
}

export default FormatNotes;