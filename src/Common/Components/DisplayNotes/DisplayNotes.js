import React from 'react';
import {Outlet, useParams} from 'react-router-dom';
import {useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function DisplayNotes({children}){
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const {note, archiveNote, tag} = useParams();

    return tablet ? 
        (!note && !archiveNote && !tag) ? children : <Outlet/> :
        <section className={styles.notes}>
            {children}
            <Outlet/>
        </section>
    
}

export default DisplayNotes;