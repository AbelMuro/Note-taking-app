import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import Form from './Form';
import icons from '`/icons'
import * as styles from './styles.module.css';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname || '';
    const token = pathname.slice(7, pathname.length);
    if(!token){
        navigate('/');
        return;
    }


    return(
        <section className={styles.reset}>
            <img className={styles.reset_logo} src={icons['logo']}/>
            <h1 className={styles.reset_title}>
                Reset Your Password
            </h1>
            <p className={styles.reset_desc}>
                Choose a new password to secure your account.
            </p>
            <Form token={token}/>
        </section>
    )
}

export default ResetPassword;