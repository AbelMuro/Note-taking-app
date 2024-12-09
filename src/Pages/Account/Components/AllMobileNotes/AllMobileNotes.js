import React from 'react';
import {useNotes, useTheme} from '~/Hooks';
import {useNavigate, Outlet, useParams} from 'react-router-dom';
import * as styles from './styles.module.css';
import FormatNotes from '~/Common/Components/FormatNotes';

function AllMobileNotes(){
    const [, changeClass] = useTheme(styles);
    const [allNotes, loading] = useNotes('http://localhost:4000/get-notes/notes');
    const navigate = useNavigate();
    const {note, archiveNote, tag} = useParams();


    return (!note && !archiveNote && !tag) ? 
            <section className={changeClass('notes')}>
                <h1 className={changeClass('notes_title')}>
                    All Notes
                </h1>   
                <FormatNotes allNotes={allNotes} loading={loading}/>
            </section> : 
            <Outlet/>
}

export default AllMobileNotes;