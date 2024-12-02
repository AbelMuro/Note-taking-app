import React, {useEffect, useDeferredValue} from 'react';
import {useSelector} from 'react-redux';
import CreateNewNote from '~/Common/Components/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function AllSearchedNotes() {
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
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllSearchedNotes;