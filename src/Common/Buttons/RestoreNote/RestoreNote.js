import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTheme, usePostRequest, useMediaQuery} from '~/Hooks';
import { ClipLoader } from 'react-spinners';
import * as styles from './styles.module.css';

function RestoreNote({id}) {
    const [tablet] = useMediaQuery('(max-width: 850px)');
    const navigate = useNavigate();
    const [makeFetch] = usePostRequest();
    const [, changeClass] = useTheme(styles);
    const [loading, setLoading] = useState(false);

    const handleRestore = async () => {
        setLoading(true);
        await makeFetch('http://localhost:4000/restore-note', {
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
        navigate('..');
        const eventCreated = new CustomEvent('display-message', {'detail': {message: 'Note has been restored', link: 'All Notes'}})
        document.dispatchEvent(eventCreated);
    }

    return tablet ? 
        <button type='button' className={changeClass('button_mobile')} onClick={handleRestore}>
            <img className={styles.icon_mobile}/>
        </button> : 
        <button type='button' className={changeClass('button')} onClick={handleRestore} style={loading ? {justifyContent: 'center'} : {}}>
            {!loading && <img className={changeClass('icon')}/>}
            {loading ? <ClipLoader size='30px' color='#335CFF'/> : 'Restore Note'}
        </button>   
    
}

export default RestoreNote;