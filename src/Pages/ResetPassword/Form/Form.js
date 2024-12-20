import React, {useState, useEffect} from 'react';
import EnterPassword from './EnterPassword';
import ReEnterPassword from './ReEnterPassword';
import { ClipLoader } from 'react-spinners';
import {usePreNavigate} from '~/Hooks';
import * as styles from './styles.module.css';

function Form({token}) {
    const navigate = usePreNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.elements['password'].value;
        const confirmPassword = e.target.elements['confirm-password'].value;

        if(password !== confirmPassword){
            setError('unequal');
            return;
        }
        setLoading(true);
        try{
            const response = await fetch(`https://note-taking-server.netlify.app/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token, password})
            });
            let result;

            if(response.status === 200){
                result = await response.text();
                navigate('/');
            }
            else if(response.status === 400){
                result = await response.text();
                navigate('/forgot');
            }
            else
                result = await response.text();
                
            const event = new CustomEvent('display-message', {'detail': {message: result, error: response.status !== 200}});
            document.dispatchEvent(event);
        }
        catch(error){
            const message = error.message;
            console.log(message);     
            const event = new CustomEvent('display-message', {'detail': {message: 'Server is offline, please try again later', error: true}});
            document.dispatchEvent(event);       
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterPassword/>
            <ReEnterPassword/>
            {error && 
                <div className={styles.error}> 
                    <img className={styles.error_icon}/>
                    Passwords are not the same
                </div>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='white'/> : 'Reset Password'}
            </button>
        </form>
    )
}

export default Form;