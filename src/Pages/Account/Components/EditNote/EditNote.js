import React, {useRef} from 'react';
import EnterTitle from './EnterTitle';
import EnterTags from './EnterTags';
import LastEdited from './LastEdited';
import EnterNote from './EnterNote';
import MiscButtons from './MiscButtons';
import {useLocation} from 'react-router-dom';
import {useTheme} from '~/Hooks';
import {useNavigate} from 'react-router-dom';
import {useUpdateNotes} from '~/Hooks';
import * as styles from './styles.module.css';


function EditNote() {
    const [makeFetch] = useUpdateNotes();
    const navigate = useNavigate();
    const [,changeClass] = useTheme(styles);
    const {state, pathname} = useLocation();
    const note = state && state.note;
    const months = useRef(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        return  `${day} ${months.current[month]} ${year}`;
    }

    const handleAddNewNote = async (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const tags = e.target.elements.tags.value;
        const body = e.target.elements.note.value;
        const lastEdited = getCurrentDate();

        let url;
        if(pathname === '/account/notes')
            url = 'http://localhost:4000/add-note';
        else if(pathname === '/account/archived-notes') 
            url = 'http://localhost:4000/add-archived-note'

        await makeFetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, tags, lastEdited, body}),
            credentials: 'include'
        })
    }

    const handleUpdateNote = async (e) => {
        e.preventDefault()
        const id = note.id;
        const title = e.target.elements.title.value;
        const tags = e.target.elements.tags.value;
        const body = e.target.elements.note.value;
        const lastEdited = getCurrentDate();

        let url;
        if(pathname === '/account/notes')
            url = 'http://localhost:4000/update-note';
        else if(pathname === '/account/archived-notes') 
            url = 'http://localhost:4000/update-archived-note';

        await makeFetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id, title, tags, body, lastEdited
            }),
            credentials: 'include'
        });
    }

    return(
        <>
            <form className={changeClass('note')} onSubmit={note ? handleUpdateNote : handleAddNewNote}>
                <EnterTitle prevTitle={note && note.title}/>
                <EnterTags prevTags={note && note.tags}/>
                <LastEdited lastEdited={note && note.lastEdited}/>
                <hr className={changeClass('note_line')}/>
                <EnterNote prevNote={note && note.body}/>
                <hr className={changeClass('note_line')}/>
                <div className={styles.buttons}>
                    <button className={styles.save}>
                        Save Note
                    </button>
                    <button className={changeClass('cancel')}>
                        Cancel
                    </button>
                </div>
            </form>        
            <MiscButtons id={note && note.id}/>
        </>
    )
}

export default EditNote;