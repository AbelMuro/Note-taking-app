import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import AllNotes from './AllNotes';
import * as styles from './styles.module.css';

function DisplayNote(){

    return(
        <section className={styles.notes}>
            <AllNotes/>
            <Outlet/>
        </section>
    )
}

export default DisplayNote;