import React, {useState} from 'react';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTitle() {
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
                className={styles.input} 
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