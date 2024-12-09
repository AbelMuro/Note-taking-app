import React, {useEffect, useDeferredValue} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import SearchBox from '~/Common/Components/SearchBox';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to make the searchbox input component re-usabled by removing it from the HeaderBar 
//and placing it in the Common/Components folder

function AllSearchedNotes() {
    const navigate = useNavigate();
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const search = useSelector(state => state.search.search);
    const deferredSearch = useDeferredValue(search, {timeoutMs: 500});
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/search:${search.toLowerCase()}`);
    const [, changeClass] = useTheme(styles);

    const handleNavigate = () => {
        navigate('/account/untitled', {state: {note: {newNote: true}}});
    }

    useEffect(() => {
        setUrl(`http://localhost:4000/get-notes/search:${deferredSearch.toLowerCase()}`);
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
                    {(search && allNotes.length > 0) && <p className={changeClass('notes_message')}>
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