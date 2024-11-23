import React from 'react';
import EnterTitle from './EnterTitle';
import EnterTags from './EnterTags';
import LastEdited from './LastEdited';
import EnterNote from './EnterNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function EditNote() {
    const [,changeClass] = useTheme(styles);


    return(
        <form className={changeClass('note')}>
            <EnterTitle />
            <EnterTags/>
            <LastEdited/>
            <hr className={changeClass('note_line')}/>
            <EnterNote/>
            <hr className={changeClass('note_line')}/>
            <div className={styles.buttons}>
                <button className={styles.save}>
                    Save Note
                </button>
                <button className={styles.cancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default EditNote;