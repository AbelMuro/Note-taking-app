const thirdPartyCookiesEnabled = () => {
    document.cookie = 'thirdPartyTestCookie=test; SameSite=None; Secure';
    const cookieExists = document.cookie.indexOf("thirdPartyTestCookie") !== -1;
    console.log(cookieExists, document.cookie.indexOf("thirdPartyTestCookie"));

    if(!cookieExists){
        const event = new CustomEvent('display-message', {'detail' : {message: 'Please enable third-party-cookies in your browser to use this app', error: true}})
        document.dispatchEvent(event);
        return false
    }

    return true;   
}

export default thirdPartyCookiesEnabled;