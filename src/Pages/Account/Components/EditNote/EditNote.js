import React, {useRef, useState} from 'react';
import {getRootofRoute} from '~/Common/Functions';
import { ClipLoader } from 'react-spinners';
import EnterTitle from './EnterTitle';
import EnterTags from './EnterTags';
import LastEdited from './LastEdited';
import EnterNote from './EnterNote';
import MiscButtons from './MiscButtons';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import {useUpdateNotes} from '~/Hooks';
import * as styles from './styles.module.css';

function EditNote() {
    const {tags} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [makeFetch] = useUpdateNotes();
    const [,changeClass] = useTheme(styles);
    const {pathname, state} = useLocation();
    const note = state && state.note;
    const months = useRef(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        return `${day} ${months.current[month]} ${year}`;
    }

    const handleCancel = () => {
        const route = getRootofRoute(pathname);
        if(route === '/account/tags')
            navigate(`${route}/${tags}`);
        else
            navigate(route);
    }   

    const handleAddNewNote = async (e) => {
        e.preventDefault();
        setLoading(true);
        const title = e.target.elements.title.value;
        const tags = e.target.elements.tags.value;
        const body = e.target.elements.note.value;
        const lastEdited = getCurrentDate();

        const result = await makeFetch(`http://localhost:4000/add-note/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, tags, lastEdited, body}),
            credentials: 'include'
        })
        setTimeout(() => {
            alert(result)
        }, 500);
        setLoading && setLoading(false);
        navigate(`/account/${title}`)
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);     
        const eventTags = new Event('update-tags');
        document.dispatchEvent(eventTags);
    }

    const handleUpdateNote = async (e) => {
        e.preventDefault()
        setLoading(true);
        const id = note.id;
        const title = e.target.elements.title.value;
        const tags = e.target.elements.tags.value;
        const body = e.target.elements.note.value;
        const lastEdited = getCurrentDate();

        const result = await makeFetch(`http://localhost:4000/update-note`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id, title, tags, body, lastEdited
            }),
            credentials: 'include'
        });
        setTimeout(() => {
            alert(result)
        }, 500);
        setLoading && setLoading(false);
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);  
        const event = new Event('update-tags');
        document.dispatchEvent(event);
    }

    return note && (
       <>
            <form className={changeClass('note')} onSubmit={note.newNote ? handleAddNewNote : handleUpdateNote}>
                <EnterTitle prevTitle={(note.title)}/>
                <EnterTags prevTags={(note.tags)}/>
                <LastEdited lastEdited={(note.lastEdited)}/>
                <hr className={changeClass('note_line')}/>
                <EnterNote prevNote={note.body}/>
                <hr className={changeClass('note_line')}/>
                <div className={styles.buttons}>
                    <button className={styles.save}>
                        {loading ? <ClipLoader size='30px' color='white'/>  : 'Save Note'}
                    </button>
                    <button type='button' className={changeClass('cancel')} onClick={handleCancel}>
                        Cancel
                    </button>
                </div> 
            </form>        
            <MiscButtons/>                
        </>     
    )
}

export default EditNote;