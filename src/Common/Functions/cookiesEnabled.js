const cookiesEnabled = () => {
    document.cookie = 'testCookie';
    const cookieExists = document.cookie.indexOf('testCookie') !== -1;
    const doNotTrackEnabled = (navigator.doNotTrack === "1") || (navigator.msDoNotTrack === "1");

    if(cookieExists){
        const event = new CustomEvent('display-message', {'detail' : {message: 'Please enable cookies in your browser to use this app', error: true}})
        document.dispatchEvent(event);
        return false
    }
    else if(doNotTrackEnabled){
        const event = new CustomEvent('display-message', {'detail' : {message: 'Please enable cross-site tracking to use this app', error: true}});
        document.dispatchEvent(event);
        return false;
    }

    return true;   
}

export default cookiesEnabled;