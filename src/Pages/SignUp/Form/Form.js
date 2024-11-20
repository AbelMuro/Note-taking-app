import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import EnterEmail from '~/Common/EnterEmail';
import EnterPassword from './EnterPassword';
import {ClipLoader} from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles.module.css';

function Form() {
    const [,changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let email = e.target.elements.email.value.toLowerCase();
        email = email.toLowerCase();
        const password = e.target.elements.password.value;

        try{
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/');                
                setTimeout(() => {
                    alert('Account has been created, you can log-in now')
                }, 500);
            }
            else {
                const message = await response.text();
                alert(message);
                console.log(`Server Error: ${message}`);
            }
        }
        catch(error){
            alert('Internal Server Error has occured, please try again later')
            console.log(`Unknown Error: ${error}`);
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