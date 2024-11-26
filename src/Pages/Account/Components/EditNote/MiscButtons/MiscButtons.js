import React from 'react';
import {useLocation} from 'react-router-dom';
import DeleteNote from './DeleteNote';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';

//this is where i left off, i will need to change the functionality of the buttons based on the current route in react-routers
function MiscButtons({id}) {
    const [,changeClass] = useTheme(styles);
    const {pathname, state} = useLocation();
    const note = state && state.note;

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



    return(
        <section className={changeClass('container')}>
            <button className={changeClass('archive_button')} onClick={handleArchive} disabled={note ? false : true}>
                <img className={changeClass('archive_icon')}/>
                Archive Note
            </button>
            <DeleteNote id={id}/>
        </section>
    )
}

export default MiscButtons;