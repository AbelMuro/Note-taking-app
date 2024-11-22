import React from 'react';
import EnterTitle from './EnterTitle';
import EnterTags from './EnterTags';
import * as styles from './styles.module.css';

function EditNote() {
    return(
        <form className={styles.note}>
            <EnterTitle />
            <EnterTags/>
        </form>
    )
}

export default EditNote;