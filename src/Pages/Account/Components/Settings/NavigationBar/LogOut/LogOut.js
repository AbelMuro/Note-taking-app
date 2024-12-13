import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useTheme} from '~/Hooks';
import Dialog from '~/Common/Components/Dialog';
import * as styles from './styles.module.css';

function LogOut() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [,changeClass] = useTheme(styles);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:4000/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: '',
            })
            let message;

            if(response.status === 200){
                navigate('/');   
                message = 'User has been logged out';
            }
            else
                message = 'Internal Server Error has occurred, please try again later.';
            
            const event = new CustomEvent('display-message', {'detail': {message: message, error: response.status !== 200}});
            document.dispatchEvent(event);
                             
        }
        catch(error){
            const message = error.message;
            console.log(message)
            const event = new CustomEvent('display-message', {'detail': {message: 'Server is offline, please try again later.', error: true}});
            document.dispatchEvent(event);
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <>
            <button className={changeClass('logout_button')} onClick={handleOpen}>
                <img className={changeClass('logout_icon')}/>
                 Logout
            </button>
            <Dialog 
                open={open} 
                loading={loading}
                handleOpen={handleOpen} 
                handleAction={handleLogout} 
                title='Log out' 
                desc='Are you sure you want to log out?' 
                icon='icon-logout.svg'
                confirm='Log out'
                confirmButtonColor='#FB3748'
                confimrButtonColorHover='#b11e2a'
                />
        </>
    )
}

export default LogOut;