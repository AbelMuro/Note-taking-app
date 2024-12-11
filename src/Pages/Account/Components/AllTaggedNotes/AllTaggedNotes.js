import React, {useEffect} from 'react';
import CreateNewNote from '~/Common/Buttons/CreateNewNote';
import {useNotes, useTheme, useMediaQuery} from '~/Hooks';
import {useParams} from 'react-router-dom';
import FormatNotes from '~/Common/Components/FormatNotes'
import * as styles from './styles.module.css';

//i need to think about this more carefully, i may need to refactor this component for 
//tablet in a way that i can display the tags first, then the notes, then the EditNote 

function AllTaggedNotes() {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {tags} = useParams();
    const [allNotes, loading, setUrl] = useNotes(`http://localhost:4000/get-notes/${tags}`);
    const [, changeClass] = useTheme(styles);

    useEffect(() => {
        setUrl(`http://localhost:4000/get-notes/${tags}`);
    }, [tags])

    return tablet ? 
        <div className={styles.notes_mobile}>
            <h1 className={styles.notes_mobile_title}>
                Tags
            </h1>

        </div> :
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            <FormatNotes 
                allNotes={allNotes} 
                loading={loading} 
                emptyMessage={'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.'}/>
        </div>

}

export default AllTaggedNotes;