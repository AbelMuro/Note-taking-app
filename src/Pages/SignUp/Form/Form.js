import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import EnterEmail from '~/Common/Inputs/EnterEmail';
import EnterPassword from './EnterPassword';
import {ClipLoader} from 'react-spinners';
import { usePreNavigate } from '~/Hooks';
import * as styles from './styles.module.css';

function Form() {
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let email = e.target.elements.email.value.toLowerCase();
        email = email.toLowerCase();
        const password = e.target.elements.password.value;

        try{
            const response = await fetch('https://note-taking-server.netlify.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            let result;

            if(response.status === 200){
                result = await response.text();
                console.log(result);
                navigate('/');       
            }
            else {
                result = await response.text();
                console.log(`Server Error: ${result}`);
            }
            const event = new CustomEvent('display-message', {'detail': {message: result, error: response.status !== 200}})         
            document.dispatchEvent(event);
        }
        catch(error){
            const message = error.message;
            console.log(message);            
            const event = new CustomEvent('display-message', {'detail': {message: 'Server is offline, please try again later', error: true}})         
            document.dispatchEvent(event);
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <form className={changeClass('form')} onSubmit={handleSubmit}>
            <EnterEmail/>
            <EnterPassword/>
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='white'/> : 'Sign Up'}
            </button>
        </form>
    )
}

export default Form;