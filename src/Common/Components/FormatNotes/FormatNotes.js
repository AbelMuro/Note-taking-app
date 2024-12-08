import React, {useState, useEffect} from 'react';
import LoadingNotes from './LoadingNotes'
import {useNavigate, useParams} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to make this component responsive for tablet and mobile devices,
//also, make sure to finish the header and navbar components for tablet and mobile
//i may need to double check this component to ensure that the correct note is still selected when i switch from desktop to tablet

function FormatNotes({allNotes, loading}) {
    const {note, archiveNote, tag} = useParams();
    const [theme, changeClass] = useTheme(styles);
    const [selectedNote, setSelectedNote] = useState('');
    const navigate = useNavigate();

    const handleStyles = (id) => {
        if(theme === 'light')
            return selectedNote === id ? {backgroundColor: '#F3F5F8'} : {};
        else
            return selectedNote === id ? {backgroundColor: '#232530'} : {};
    }

    const handleNote = (note) => {
        setSelectedNote(note.id);
        navigate(`${note.title}`, {state: {note}});
    } 

    useEffect(() => {
        setSelectedNote('');
    }, [allNotes])

    useEffect(() => {
        if(!note && !archiveNote && !tag)
            setSelectedNote('');
    }, [note, archiveNote, tag])

    return loading ? 
                <LoadingNotes/> : 
                <div className={styles.notes_all}>
                    {allNotes.length !== 0 ? allNotes.map((currentNote) => {
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
                    }) : <p className={changeClass('message')}>
                            You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
                        </p>}                    
                </div>
            
    
}

export default FormatNotes;