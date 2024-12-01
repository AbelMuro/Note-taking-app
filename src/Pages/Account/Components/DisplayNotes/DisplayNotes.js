import React from 'react';
import {Outlet} from 'react-router-dom';
import AllNotes from './AllNotes';
import * as styles from './styles.module.css';

function DisplayNotes(){
    return(
        <section className={styles.notes}>
            <AllNotes/>
            <Outlet/>
        </section>
    )
}

export default DisplayNotes;