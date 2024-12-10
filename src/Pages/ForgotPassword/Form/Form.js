import React, {useState} from 'react';
import EnterEmail from '~/Common/Inputs/EnterEmail';
import {ClipLoader} from 'react-spinners'
import * as styles from './styles.module.css';

function Form() {
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.elements.email.value;

        try{
            const response = await fetch('http://localhost:4000/send_link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });

            let result;
            
            if(response.status === 200)
                result = await response.text();
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
            <EnterEmail/>
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='white'/> : 'Send Reset Link'}
            </button>
        </form>
    )
}

export default Form;