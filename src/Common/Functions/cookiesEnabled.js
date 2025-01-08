const cookiesEnabled = () => {
    document.cookie = 'testCookie';
    const cookieExists = document.cookie.indexOf('testCookie') !== -1;

    if(!cookieExists){
        const event = new CustomEvent('display-message', {'detail' : {message: 'Please enable third-party-cookies in your browser to use this app', error: true}})
        document.dispatchEvent(event);
        return false
    }

    return true;   
}

export default cookiesEnabled;