import React, {useState} from 'react';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterTags() {
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
            <div className={styles.header}>
                <img className={styles.header_icon} src={icons['tag']}/>
                Tags
            </div>
            <input 
                type='text'
                name='tags'
                className={styles.input} 
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