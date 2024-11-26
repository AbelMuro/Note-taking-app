import React from 'react';
import {Outlet} from 'react-router-dom';
import AllArchivedNotes from './AllArchivedNotes';
import * as styles from './styles.module.css';

function DisplayArchivedNotes(){

    return(
        <section className={styles.notes}>
            <AllArchivedNotes/>
            <Outlet/>
        </section>
    )
}

export default DisplayArchivedNotes;