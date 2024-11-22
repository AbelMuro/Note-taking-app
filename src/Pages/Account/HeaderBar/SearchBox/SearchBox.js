import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function SearchBox() {
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
                className={styles.search_box} 
                placeholder='Search by title, content, or tags...'/>  
            <img className={styles.search_icon}/>          
        </div>

    )
}


export default SearchBox;