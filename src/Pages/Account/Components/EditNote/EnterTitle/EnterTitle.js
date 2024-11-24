import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTitle({prevTitle}) {
    const [,changeClass] = useTheme(styles);
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const {state} = useLocation();
    const note = state && state.note;

    const handleTitle = (e) => {
        e.target.setCustomValidity('');
        setError('');        
        const input = e.target.value;
        setTitle(input);
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
        setTitle(prevTitle || '');
    }, [prevTitle])

    useEffect(() => {
        setError('');
    }, [note])

    return(
        <fieldset className={styles.container}>
            <input 
                type='text' 
                name='title'
                className={changeClass('input')} 
                value={title}
                onChange={handleTitle}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                placeholder='Enter a title...'
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

export default EnterTitle;