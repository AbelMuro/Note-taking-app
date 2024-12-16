import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useTheme, useSessionStorage} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterNote({prevNote}) {
    const dispatch = useDispatch();
    const [, changeClass] = useTheme(styles);
    const [unsavedNote] = useSessionStorage('note-body');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const {state} = useLocation();
    const oldNote = state && state.note;

    const handleNote = (e) => {
        e.target.setCustomValidity('');
        setError('');
        const input = e.target.value;
        setNote(input);
        sessionStorage.setItem('note-body', note);
        dispatch({type: 'SET_CHANGES', payload: false});
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError('empty')
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        setError('empty');
    }

    useEffect(() => {
        if(unsavedNote)
            setNote(unsavedNote)
        else if(prevNote)
            setNote(prevNote);
        else
            setNote('');
    }, [prevNote, unsavedNote])

    useEffect(() => {
        setError('');
    }, [oldNote])

    return(
        <>
            <textarea 
                className={changeClass('textarea')}
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