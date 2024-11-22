import React from 'react';
import {useTheme} from '~/Hooks';
import {useSelector, useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function SearchBox() {
    const [theme, changeClass] = useTheme(styles);
    const search = useSelector(state => state.search.search);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const query = e.target.value;
        dispatch({type: 'UPDATE_SEARCH', payload: query});
    }

    return(
        <div className={styles.search}>
            <input 
                type='search' 
                value={search}
                onChange={handleSearch}
                className={changeClass('search_box')} 
                placeholder='Search by title, content, or tags...'/>  
            <img className={changeClass('search_icon')}/>          
        </div>

    )
}


export default SearchBox;