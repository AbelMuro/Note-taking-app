import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeaderBar from './HeaderBar';
import * as styles from './styles.module.css';

function Account() {

    /* 
    const getNotes = async () => {
        try{
            const response = await fetch('http://localhost:4000/account', {
                method: 'GET',
                credentials: 'include'
            });
            
            if(response.status === 200){
                const results = await response.json();
                console.log(results);
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
            }
            else{
                const message = await response.text();
                console.log(message);
            }
        }
        catch(error){
            const message = error.message;
            alert('Internal Server Error has occurred, please try again later');
            console.log(message)
        }

    }


    useEffect(() => {
        getNotes();
    }, [])

    */

    return(
        <main className={styles.container}>
            <NavigationBar/>
            <HeaderBar/>
            <Outlet/>
        </main>
    )
}

export default Account;