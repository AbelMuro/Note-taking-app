import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTitle() {
    const [theme, changeClass] = useTheme(styles);
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

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