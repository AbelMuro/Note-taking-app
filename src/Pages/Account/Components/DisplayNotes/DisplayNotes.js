import React, {useState} from 'react';
import AllNotes from './AllNotes';
import EditNote from './EditNote';
import * as styles from './styles.module.css';

//i will need to create another component 'last edited'
function DisplayNote(){
    const [note, setNote] = useState('id');

    return(
        <section className={styles.notes}>
            <AllNotes note={note} setNote={setNote}/>
            <EditNote note={note}/>
        </section>
    )
}

export default DisplayNote;