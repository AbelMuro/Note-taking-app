import React from 'react';
import {Outlet, useParams} from 'react-router-dom';
import {useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function DisplayNotes({children}){
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {note, archiveNote, tag} = useParams();

    return (
        <section className={tablet ? '' : styles.notes}>
            {(tablet ? (!note && !archiveNote && !tag) : true) && children}
            <Outlet/>
        </section>
    )
}

export default DisplayNotes;