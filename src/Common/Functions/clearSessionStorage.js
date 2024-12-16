const clearSessionStorage = () => {
    sessionStorage.setItem('note-title', '');
    sessionStorage.setItem('note-tags', '');
    sessionStorage.setItem('note-body', '');
}

export default clearSessionStorage;