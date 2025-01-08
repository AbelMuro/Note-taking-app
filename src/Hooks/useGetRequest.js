import { useNavigate } from "react-router-dom";

function useGetRequest(){
    const navigate = useNavigate();

    const makeFetch = async (url, options) => {

        let event;

        try{
            const response = await fetch(url, options);

            if(response.status === 200){
                const result = await response.json();
                return result;
            }
            else if(response.status === 401){
                const message = await response.text();
                console.log(message);
                navigate('/')
                event = new CustomEvent('display-message', {'detail': {message, error: true}});
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                event = new CustomEvent('display-message', {'detail': {message, error: true}});
            }
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
                event = new CustomEvent('display-message', {'detail': {message, error: true}});
            }
            else{
                const message = await response.text();
                console.log(message);
                event = new CustomEvent('display-message', {'detail': {message: 'Internal Server Error has occurred, please try again later.', error: true}});
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            event = new CustomEvent('display-message', {'detail': {message: 'Server is offline, please try again later.', error: true}});
        }
        finally{
            event && document.dispatchEvent(event);
        }
    }

    return [makeFetch];
}


export default useGetRequest;
