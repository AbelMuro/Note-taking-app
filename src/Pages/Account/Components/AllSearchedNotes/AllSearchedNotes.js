import React, {useEffect, useDeferredValue} from 'react';
import {useSelector} from 'react-redux';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to make the searchbox input component re-usabled by removing it from the HeaderBar 
//and placing it in the Common/Components folder

function AllSearchedNotes() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const search = useSelector(state => state.search.search);
    const deferredSearch = useDeferredValue(search, {timeoutMs: 500});
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/search:${search.toLowerCase()}`);
    const [, changeClass] = useTheme(styles);

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
                </section>
                }
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllSearchedNotes;