import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '~/Hooks';
import icons from '../icons';
import * as styles from './styles.module.css';

function Tags({handleStyles, handleColor}){
    const [theme, changeClass] = useTheme(styles);
    const option = useSelector(state => state.nav.nav);
    const dispatch = useDispatch();

    const handleTag = (selectedTag) => {
        dispatch({type: 'UPDATE_NAV', payload: selectedTag});
    }

    return(
        <section className={styles.tags}>
            <h1 className={styles.tags_title}>
                Tags
            </h1>
            <div className={changeClass('tags_tag')} style={handleStyles('Cooking')} onClick={() => handleTag('Cooking')}>
                <img className={changeClass('tags_icon')} style={handleColor('Cooking')}/>
                Cooking
                {option === 'Cooking' && <img className={styles.tags_arrow} src={theme === 'light' ? icons['arrowRight'] : icons['arrowRightDark']}/>}
            </div>
        </section>
    )
}

export default Tags;