import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTags() {
    const [theme, changeClass] = useTheme(styles);
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    const handleTags = (e) => {
        e.target.setCustomValidity(' ');
        const input = e.target.value;
        setError('');
        setTags(input);

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