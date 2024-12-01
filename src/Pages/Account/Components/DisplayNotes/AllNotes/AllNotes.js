import React from 'react';
import CreateNewNote from '~/Common/Components/CreateNewNote';
import FormatNotes from '~/Common/Components/FormatNotes';
import {useNotes, useTheme} from '~/Hooks';
import * as styles from './styles.module.css';


function AllNotes() {
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/notes');
    const [, changeClass] = useTheme(styles);
    
  
    return(
        <div className={changeClass('notes')}>
            <CreateNewNote/>
            <FormatNotes allNotes={allNotes} loading={loading}/>
        </div>
    )
}

export default AllNotes;