import React from 'react';
import {Outlet} from 'react-router-dom';
import * as styles from './styles.module.css';

function DisplayNotes({children}){

    return(
        <section className={styles.notes}>
            {children}
            <Outlet/>
        </section>
    )
}

export default DisplayNotes;