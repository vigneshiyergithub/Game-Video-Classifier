import React, { Fragment, useState } from 'react';
import AppHeader from './AppHeader'
import ContentPage from './ContentPage';
import UserModal from './UserModal';

const MainApp = (props) => {
    const [user, setUser] = useState('')
    const [open, setOpen] = useState(!user)

    return <Fragment>
        <AppHeader user={user} changeUser={() => setOpen(true)}/>
        <UserModal open={open} setOpen={setOpen} user={user} setUser={setUser} />
        <ContentPage user={user} /> 
    </Fragment>
};

export default MainApp;