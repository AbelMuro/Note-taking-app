import React, {useState, useEffect} from 'react';
import EnterPassword from './EnterPassword';
import ReEnterPassword from './ReEnterPassword';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function Form({token}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setError('unequal');
            return;
        }
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:4000/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token, password})
            });

            if(response.status === 200){
                const result = await response.text();
                navigate('/');
                setTimeout(() => {
                    alert(result);
                }, 500);
            }
            else if(response.status === 400){
                const message = await response.text();
                navigate('/forgot')
                setTimeout(() => {
                    alert(message);
                }, 500);
            }
            else{
                const message = await response.text();
                setTimeout(() => {
                    alert(message);
                })
            }     
        }
        catch(error){
            const message = error.message;
            console.log(message);            
            alert('Internal Server Error has occurred, please try again later');
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    useEffect(() => {
        setError('');
    }, [password, confirmPassword])

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterPassword password={password} setPassword={setPassword}/>
            <ReEnterPassword password={confirmPassword} setPassword={setConfirmPassword}/>
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