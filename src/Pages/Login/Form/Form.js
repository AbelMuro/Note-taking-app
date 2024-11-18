import React, {useState} from 'react';
import EnterEmail from '~/Common/EnterEmail';
import EnterPassword from './EnterPassword';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';
import { ClipLoader } from 'react-spinners';

function Form() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.elements.email.value;
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
                alert(message);
            }
        }
        catch(error){
            const message = error.message;
            alert('Internal Server Error has occurred, please try again later');
            console.log(message);
        }
        finally{
            setLoading && setLoading(false);
        }

    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <EnterPassword/>
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='white'/> : 'Login'}
            </button>
        </form>
    )
}

export default Form;