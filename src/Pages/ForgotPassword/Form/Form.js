import React, {useState} from 'react';
import EnterEmail from '~/Common/EnterEmail';
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
            
            if(response.status === 200){
                const result = await response.text();
                alert(result);
            }
            else {
                const message = await response.text();
                alert(message);
            }

        }
        catch(error){
            const message = error.message;
            alert('Internal Server Error has occurred');
            console.log(message);
        }
        finally{
            setLoading(false);    
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