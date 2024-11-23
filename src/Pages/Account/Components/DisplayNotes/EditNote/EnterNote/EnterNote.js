import React, {useState} from 'react';
import icons from '`/icons';
import * as styles from './styles.module.css';

//this is where i left off, i will need to change the theme here
function EnterNote() {
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const handleNote = (e) => {
        e.target.setCustomValidity('');
        setError('');
        const input = e.target.value;
        setNote(input);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError('empty')
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        setError('empty')
    }
    
    return(
        <>
            <textarea 
                className={styles.textarea}
                name='note'
                value={note}
                onChange={handleNote}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                placeholder='Start typing your note here...'
                required
                >
            </textarea>    
            {error === 'empty' && <div className={styles.error_message}>
                <img className={styles.error_icon} src={icons['error']}/>
                Can't be empty
            </div>}    
        </>

    )
}

export default EnterNote;