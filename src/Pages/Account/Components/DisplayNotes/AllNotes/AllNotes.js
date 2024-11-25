import React, {useState, useEffect} from 'react';
import FormatNotes from '~/Common/Components/FormatNotes'
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllNotes() {
    const [, changeClass] = useTheme(styles);
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {pathname, state} = useLocation();
    const note = state && state.note;
  
    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        navigate(pathname);
    }

    const getNotes = async () => {
        setLoading(true);
        try{
            let url;
            if(pathname === '/account/notes')
                url = 'http://localhost:4000/get-notes';
            else if(pathname === '/account/notes/archive') 
                url = 'http://localhost:4000/get-archived-notes'

            const response = await fetch(url, {
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
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
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
    }, [pathname])

    return(
        <div className={changeClass('notes')}>
            <button type='button' className={styles.notes_button} onClick={handleNewNote}>
                + Create New Note
            </button>
            {pathname === '/account/notes/archive' && 
                <p className={changeClass('notes_message')}>
                    All your archived notes are stored here. You can restore or delete them anytime.
                </p> 
            }
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;