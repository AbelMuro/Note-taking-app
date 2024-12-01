import React, {useState} from 'react';
import {getRootofRoute} from '~/Common/Functions';
import { ClipLoader } from 'react-spinners';
import {useUpdateNotes} from '~/Hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import DeleteNote from './DeleteNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function MiscButtons() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useUpdateNotes();
    const [,changeClass] = useTheme(styles);
    const {pathname, state} = useLocation();
    const note = state && state.note;

    const handleArchive = async () => {
        const id = note.id;
        setLoading(true);
        const result = await makeFetch('http://localhost:4000/archive-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
        setTimeout(() => {
            alert(result)
        }, 500)

        const route = getRootofRoute(pathname);

        if(route === '/account/tags')
            navigate(pathname, {state: {note: {...note, archived: true}}})        
        else{
            const eventNotes = new Event('notes-updated');
            document.dispatchEvent(eventNotes);  
            navigate(route);
        }
    }

    const handleRestore = async () => {
        const id = note.id;
        setLoading(true);
        const result = await makeFetch('http://localhost:4000/restore-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
        setTimeout(() => {
            alert(result)
        }, 500)
        const route = getRootofRoute(pathname);

        if(pathname.startsWith('/account/tags'))
            navigate(pathname, {state: {note: {...note, archived: false}}})        
        else{
            const eventNotes = new Event('notes-updated');
            document.dispatchEvent(eventNotes);  
            navigate(route);
        }
    }

    return(
        <section className={changeClass('container')}>
            {!note.newNote && <>
                {note.archived ? 
                    <button className={changeClass('misc_button')} onClick={handleRestore} style={loading ? {justifyContent: 'center'} : {}}>
                        {!loading && <img className={changeClass('misc_icon')} id={styles.restore}/>}
                        {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Restore Note'}
                    </button>  :         
                    <button className={changeClass('misc_button')} onClick={handleArchive} style={loading ? {justifyContent: 'center'} : {}}>
                        {!loading && <img className={changeClass('misc_icon')} id={styles.archive}/>}
                        {loading ? <ClipLoader size='30px' color='#335CFF'/>: 'Archive Note'}
                    </button> 
                }
                <DeleteNote id={note.id}/>            
            </>}
        </section>
    )
}

export default MiscButtons;