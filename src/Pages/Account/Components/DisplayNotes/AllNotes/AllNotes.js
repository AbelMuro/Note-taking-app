import React, {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllNotes() {
    const [theme, changeClass] = useTheme(styles);
    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleStyles = (id) => {
        if(theme === 'light')
            return note === id ? {backgroundColor: '#F3F5F8'} : {};
        else
            return note === id ? {backgroundColor: '#232530'} : {}
    }

    const handleNote = (note) => {
        setNote(note.id);
        navigate('/account/notes/', {state: {note} })
    }   

    const handleNewNote = () => {
        setNote('');
        navigate('/account/notes/');
    }

    const getNotes = async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:4000/get-notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            
            if(response.status === 200){
                const result = await response.json();
                setAllNotes(result);
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
                navigate('/')
                setTimeout(() => {
                    alert(message);
                }, 500)
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server Error has occurred');
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later')
        }
        finally{
            setLoading && setLoading(false)
        }
    }

    useEffect(() => {
        getNotes();
        document.addEventListener('notes-updated', getNotes);

        return () => document.removeEventListener('notes-update', getNotes);    
    }, [])

    return(
        <div className={changeClass('notes')}>
            <button type='button' className={styles.notes_button} onClick={handleNewNote}>
                + Create New Note
            </button>
            {
                loading ? 
                    <div className={styles.loading}>
                        <ClipLoader size='35px' color='#335cff'/>
                    </div> : 
                allNotes.map((note) => {
                    const id = note.id;
                    const title = note.title;
                    const tags = note.tags.split(',');
                    const date = note.lastEdited;

                    return(
                        <article 
                            style={handleStyles(id)}
                            className={styles.notes_note} 
                            onClick={() => handleNote(note)}
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
                })
            }
        </div>
    )
}

export default AllNotes;