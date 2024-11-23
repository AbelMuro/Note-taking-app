import React, {useState} from 'react';
import AllNotes from './AllNotes';
import EditNote from './EditNote';
import MiscButtons from './MiscButtons';
import * as styles from './styles.module.css';

function DisplayNote(){
    const [note, setNote] = useState('id');

    return(
        <section className={styles.notes}>
            <AllNotes note={note} setNote={setNote}/>
            <EditNote note={note}/>
            <MiscButtons/>
        </section>
    )
}

export default DisplayNote;