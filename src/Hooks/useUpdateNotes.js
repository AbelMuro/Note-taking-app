import {useNavigate} from 'react-router-dom';

function useUpdateNotes(){
    const navigate = useNavigate();
    
    const makeFetch = async (url, options) => {
        try {
            const response = await fetch(url, options);

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                setTimeout(() => {
                    alert(result);
                }, 500)
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


    return [makeFetch];
}

export default useUpdateNotes;