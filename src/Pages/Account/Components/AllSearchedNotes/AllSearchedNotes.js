import React, {useEffect, useDeferredValue} from 'react';
import {useSelector} from 'react-redux';
import {usePreNavigate} from '~/Hooks';
import SearchBox from '~/Common/Components/SearchBox';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function AllSearchedNotes() {
    const navigate = usePreNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const search = useSelector(state => state.search.search);
    const deferredSearch = useDeferredValue(search, {timeoutMs: 500});
    const [allNotes, loading, setUrl] = useNotes(`https://note-taking-server-thr9.onrender.com/get-notes/search:${search.toLowerCase()}`);
    const [, changeClass] = useTheme(styles);

    const handleNavigate = () => {
        navigate('/account/untitled', {state: {note: {newNote: true}}});
    }

    useEffect(() => {
        setUrl(`https://note-taking-server-thr9.onrender.com/get-notes/search:${deferredSearch.toLowerCase()}`);
    }, [deferredSearch])
    
    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            {tablet && 
                <section className={styles.notes_header}>
                    <h1 className={changeClass('notes_title')}>
                        Search
                    </h1>
                    <SearchBox/>
                    {search && 
                        <p className={changeClass('notes_message')}>
                            All notes matching <span>"{search}"</span> are displayed below.
                        </p>}
                </section>
                }
            <FormatNotes allNotes={allNotes} loading={loading} emptyMessage={
                <>
                    No notes match your search. Try a different keyword or&nbsp;
                    <a className={changeClass('link')} onClick={handleNavigate}>
                        create a new note.
                    </a>
                </>}/>
        </div>
    )
}

export default AllSearchedNotes;