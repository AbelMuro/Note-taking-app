import React, {useEffect} from 'react';
import CreateNewNote from '~/Common/Components/CreateNewNote';
import {useNotes, useTheme} from '~/Hooks';
import {useLocation, useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';

function AllNotes() {
    const {tag} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/${tag}`);
    const [, changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;

    useEffect(() => {
        setUrl(`http://localhost:4000/get-notes/${tag}`);
    }, [tag])

    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {!note && <div className={changeClass('notes_untitled')}>
                Untitled Note
            </div>}
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;