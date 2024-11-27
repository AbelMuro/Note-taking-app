import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import {useUpdateNotes} from '~/Hooks';
import {useLocation} from 'react-router-dom';
import DeleteNote from './DeleteNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to change the functionality of the buttons based on the current route in react-routers
function MiscButtons() {
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useUpdateNotes();
    const [,changeClass] = useTheme(styles);
    const {state} = useLocation();
    const note = state && state.note;


    const handleArchive = async () => {
        const id = note.id;
        setLoading(true);
        await makeFetch('http://localhost:4000/archive-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
    }

    const handleRestore = async () => {
        const id = note.id;
        setLoading(true);
        await makeFetch('http://localhost:4000/restore-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
    }

    return(
        <section className={changeClass('container')}>
            {note && <>
                {note.archived ? 
                    <button className={changeClass('misc_button')} onClick={handleRestore}>
                        {!loading && <img className={changeClass('misc_icon')} id={styles.restore}/>}
                        {loading ? <ClipLoader size='35px' color='#335CFF'/> : 'Restore Note'}
                    </button>  :         
                    <button className={changeClass('misc_button')} onClick={handleArchive} >
                        {!loading && <img className={changeClass('misc_icon')} id={styles.archive}/>}
                        {loading ? <ClipLoader size='35px' color='#335CFF'/> : 'Archive Note'}
                    </button>
                }
                <DeleteNote id={note.id}/>            
            </>}
        </section>
    )
}

export default MiscButtons;