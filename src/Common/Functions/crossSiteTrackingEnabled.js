const crossSiteTrackingEnabled = () => {
    const doNotTrackEnabled = (navigator.doNotTrack === "1") || (navigator.msDoNotTrack === "1");

    if(!doNotTrackEnabled){
        const event = new CustomEvent('display-message', {'detail' : {message: 'Please enable cross-site-tracking in your browser to use this app', error: true}});
        document.dispatchEvent(event);
        return false;
    }

    return true;   
}

export default crossSiteTrackingEnabled;