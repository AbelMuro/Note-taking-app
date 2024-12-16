import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useTheme, useSessionStorage} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTags({prevTags}) {
    const dispatch = useDispatch();
    const [,changeClass] = useTheme(styles);
    const [unsavedTags] = useSessionStorage('note-tags');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const {state} = useLocation();
    const note = state && state.note;

    const handleTags = (e) => {
        let input = e.target.value;
        input = input.replaceAll(',')

        if(input.match(/[^a-zA-Z]/)) return;

        input = e.target.value;
        input = input.split(',');

        if(input.length > 5) return;

        const tagIsTooLong = input.some(tag => tag.length > 10);

        if(tagIsTooLong) return;

        e.target.setCustomValidity('');
        setError('');
        setTags(e.target.value);
        sessionStorage.setItem('note-tags', e.target.value);
        dispatch({type: 'SET_CHANGES', payload: false});
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

    useEffect(() => {
        if(unsavedTags)
            setTags(unsavedTags)
        else if(prevTags)
            setTags(prevTags);
        else
            setTags('');
    }, [prevTags, unsavedTags])

    useEffect(() => {
        setError('');
    }, [note])


    return(
        <fieldset className={styles.container}>
            <div className={changeClass('header')}>
                <img className={changeClass('header_icon')}/>
                Tags
            </div>
            <input 
                type='text'
                name='tags'
                className={changeClass('input')} 
                value={tags}
                onChange={handleTags}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                placeholder={'Add tags separated by commas (e.g. Work, Planning)'}
                required
                />
            {error === 'empty' && 
                <div className={styles.error_message}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
        </fieldset>
    )
}

export default EnterTags;