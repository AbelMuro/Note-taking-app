import React from 'react';
import AllNotes from './AllNotes';
import {Outlet} from 'react-router-dom';
import * as styles from './styles.module.css';

function DisplayTags(){
    return(
        <section className={styles.notes}>
            <AllNotes/>
            <Outlet/>
        </section>
    )
}

export default DisplayTags;