import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

function DisplayMobileNotes({children}) {
    const {note, archiveNote, tag} = useParams();

    return (!note && !archiveNote && !tag) ? children : <Outlet/>
}

export default DisplayMobileNotes;