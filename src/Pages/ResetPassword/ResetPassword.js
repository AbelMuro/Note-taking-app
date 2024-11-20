import React from 'react';
import {useTheme} from '~/Hooks';
import {useLocation, useNavigate} from 'react-router-dom'
import Form from './Form';
import icons from '`/icons'
import * as styles from './styles.module.css';

function ResetPassword() {
    const [theme, changeClass] = useTheme(styles);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname || '';
    const token = pathname.slice(7, pathname.length);
    if(!token){
        navigate('/');
        return;
    }


    return(
        <section className={changeClass('reset')}>
            {
                theme === 'light' ? 
                    <img className={styles.reset_logo} src={icons['logo']}/> : 
                    <img className={styles.reset_logo} src={icons['logoDark']}/>
            }
            <h1 className={changeClass('reset_title')}>
                Reset Your Password
            </h1>
            <p className={changeClass('reset_desc')}>
                Choose a new password to secure your account.
            </p>
            <Form token={token}/>
        </section>
    )
}

export default ResetPassword;