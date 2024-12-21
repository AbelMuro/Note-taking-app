import React from 'react';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

function PageNotFound(){
    const [,changeClass] = useTheme(styles);

    return(
        <section className={changeClass('container')}>
            <h1>
                404 Page Not Found
            </h1>
            <p>
                Page that you requested could not be found
            </p>
        </section>
    )
}

export default PageNotFound;