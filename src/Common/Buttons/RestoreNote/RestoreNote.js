import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, usePostRequest, useMediaQuery} from '~/Hooks';

import { ClipLoader } from 'react-spinners';
import * as styles from './styles.module.css';

function RestoreNote({id}) {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const dispatch = useDispatch();
    const changesSaved = useSelector(state => state.changesSaved.changesSaved);
    const navigate = useNavigate();
    const [makeFetch] = usePostRequest();
    const [, changeClass] = useTheme(styles);
    const [loading, setLoading] = useState(false);
    
    const handleUnsavedChanges = () => {
        if(changesSaved) 
            handleRestore();
        else {
            if(confirm('You have unsaved changes, are you sure you wish to proceed?'))
                handleRestore();
        }
    }


    const handleRestore = async () => {


        setLoading(true);
        await makeFetch('https://note-taking-server.netlify.app/restore-note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id})
        })
        setLoading && setLoading(false);
        const eventNotes = new Event('notes-updated');
        document.dispatchEvent(eventNotes);  
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been restored', link: 'All Notes'}})
        document.dispatchEvent(eventCreated);
        dispatch({type: 'SET_CHANGES', payload: true});
        navigate('..');
    }

    return tablet ? 
        <button type='button' className={changeClass('button_mobile')} onClick={handleUnsavedChanges}>
            <img className={styles.icon_mobile}/>
        </button> : 
        <button type='button' className={changeClass('button')} onClick={handleUnsavedChanges} style={loading ? {justifyContent: 'center'} : {}}>
            {!loading && <img className={changeClass('icon')}/>}
            {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Restore Note'}
        </button>   
    
}

export default RestoreNote;