import React from 'react';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';


//this is where i left off, i will need to refactor the fetch requests into a useFetch() custom hook
//and i will need to refactor the delete button into its own component so that it can have its own dialog
function MiscButtons({id}) {
    const [,changeClass] = useTheme(styles);

    const handleArchive = async () => {
        try{
            const response = await fetch('http://localhost:4000/archive_note', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({id})
            });

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                alert(result);
                const event = new Event('notes-updated');
                document.dispatchEvent(event);
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
                navigate('/')
                setTimeout(() => {
                    alert(message);
                }, 500)
            }
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
                alert(message);
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server Error has occurred, please try again later');
            }
                
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }


    const handleDelete = async () => {
        try{
            const response = await fetch(`http://localhost:4000/delete-note:${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })      
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                alert(result);
                const event = new Event('notes-updated');
                document.dispatchEvent(event);
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
                navigate('/');
                setTimeout(() => {
                    alert(message);
                }, 500)
            }
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
                alert(message);
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server Error has occurred');
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later')
        }

    }

    return(
        <section className={changeClass('container')}>
            <button className={changeClass('misc')} onClick={handleArchive} disabled={id ? false : true}>
                <img className={changeClass('misc_icon')}/>
                Archive Note
            </button>
            <button className={changeClass('misc')} onClick={handleDelete} disabled={id ? false : true}>
                <img className={changeClass('misc_icon')}/>
                Delete Note
            </button>
        </section>
    )
}

export default MiscButtons;