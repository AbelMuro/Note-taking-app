

export default function getRootofRoute(pathname){                   //used by the delete button and the onClick handler for the notes
    if(pathname.startsWith('/account/archived-notes'))
        return '/account/archived-notes';
    else if(pathname.startsWith('/account/tags'))
        return '/account/tags';
    else if(pathname.startsWith('/account/settings'))
        return '/account/settings'
    else if(pathname.startsWith('/account/search'))
        return '/account/search';
    else
        return '/account';
}

