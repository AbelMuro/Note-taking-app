import React, {useEffect} from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import {useNotes, useTheme} from '~/Hooks';
import {useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';

function AllTaggedNotes() {
    const {tags} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/${tags}`);
    const [, changeClass] = useTheme(styles);

    useEffect(() => {
        setUrl(`http://localhost:4000/get-notes/${tags}`);
    }, [tags])

    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllTaggedNotes;