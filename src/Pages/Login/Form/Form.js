import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import EnterEmail from '~/Common/Inputs/EnterEmail';
import EnterPassword from './EnterPassword';
import {usePreNavigate} from '~/Hooks';
import * as styles from './styles.module.css';
import { ClipLoader } from 'react-spinners';

function Form() {
    const [,changeClass] = useTheme(styles);
    const navigate = usePreNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let email = e.target.elements.email.value;
        email = email.toLowerCase();
        const password = e.target.elements.password.value;

        try{
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            });

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/account');
            }
            else{
                const message = await response.text();
                const event = new CustomEvent('display-message', {'detail': {message, error: true}});
                document.dispatchEvent(event);
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            const event = new CustomEvent('display-message', {'detail': {message: 'Server is offline, please try again later.', error: true}});
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
                {loading ? <ClipLoader size='30px' color='white'/> : 'Login'}
            </button>
        </form>
    )
}

export default Form;