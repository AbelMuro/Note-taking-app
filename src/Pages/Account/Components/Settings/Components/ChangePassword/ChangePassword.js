import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import icons from '`/icons';
import {usePostRequest, useTheme, useMediaQuery} from '~/Hooks';
import {thirdPartyCookiesEnabled, crossSiteTrackingEnabled} from '~/Common/Functions';
import GoBackButton from '../GoBackButton';
import EnterOldPassword from './EnterOldPassword';
import EnterNewPassword from './EnterNewPassword';
import ConfirmPassword from './ConfirmPassword';
import * as styles from './styles.module.css';

function ChangePassword() {
    const [, changeClass] = useTheme(styles);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [makeFetch] = usePostRequest();
    const [tablet] = useMediaQuery('(max-width: 850px)');
 
    const handleSubmit = async (e) => {
        e.preventDefault();       


        setLoading(true); 
        const newPassword = e.target.elements['new-password'].value;
        const confirmPassword = e.target.elements['confirm-password'].value;
        const oldPassword = e.target.elements['old-password'].value;

        if(newPassword !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        const result = await makeFetch('https://note-taking-server.netlify.app/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword, oldPassword, 
            }),
            credentials: 'include'
        });
        setLoading(false);

        if(!result) return;
        const event = new CustomEvent('display-message', {'detail': {message: result, link: ''}})
        document.dispatchEvent(event);
    }

    return(
        <form className={changeClass('form')} onSubmit={handleSubmit}>
            <div className={styles.form_group}>
                {tablet && <GoBackButton/>}
                <h2 className={changeClass('form_title')}>
                    Change Password
                </h2>                
            </div>
            <EnterOldPassword/>            
            <EnterNewPassword/>
            <ConfirmPassword/>
            {error && 
                <div className={styles.message}>
                    <img className={styles.message_icon} src={icons['error']}/>
                    {error}
                </div>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='white'/> : 'Save Password'}
            </button>
        </form>
    );
}

export default ChangePassword;