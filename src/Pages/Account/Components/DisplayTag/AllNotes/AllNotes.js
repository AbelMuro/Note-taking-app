import React, {useEffect} from 'react';
import {useNotes, useTheme} from '~/Hooks';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';

function AllNotes() {
    const {tag} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/${tag}`);
    const [, changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const {pathname, state} = useLocation();
    const note = state && state.note;

    const handleNewNote = () => {
        const selectedNote = document.getElementById('selected');
        if(selectedNote)
            selectedNote.style.backgroundColor = '';
        navigate(pathname);
    }

    useEffect(() => {
        console.log(tag);
        setUrl(`http://localhost:4000/get-notes/${tag}`);
    }, [tag])

    return(
        <div className={changeClass('notes')}>
            <button type='button' className={styles.notes_button} onClick={handleNewNote}>
                + Create New Note
            </button>
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;