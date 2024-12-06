import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
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

            if(response.status === 200){
                navigate('/');   
                const event = new CustomEvent('display-message', {'detail': {message: 'User has been logged out'}});
                document.dispatchEvent(event);
            }
                             
        }
        catch(error){
            const message = error.message;
            console.log(message)
            alert('Internal Server has occurred, please try again later');
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <>
            <button className={changeClass('nav_button')} onClick={handleOpen}>
                <img className={changeClass('nav_icon_logout')}/>
                 Logout
            </button>
            <Dialog open={open}>
                <section className={styles.dialog_header}>
                    <div className={changeClass('dialog_box')}>
                        <img className={changeClass('dialog_icon')}/>
                    </div>
                    <h2 className={changeClass('dialog_title')}>
                        Logout
                    </h2>
                    <p className={changeClass('dialog_desc')}>
                        Are you sure you want to logout?
                    </p>                        
                </section>
                <hr className={changeClass('dialog_line')}/>
                <section className={styles.dialog_buttons}>
                    <button className={changeClass('dialog_cancel')} onClick={handleOpen}>
                        Cancel
                    </button>
                    <button className={styles.dialog_logout} onClick={handleLogout}>
                        {loading ? <ClipLoader size='30px' color='#FFF'/> : 'Logout'}
                    </button>
                </section>
            </Dialog>
        </>
    )
}

export default LogOut;