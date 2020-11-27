import React, { Fragment } from 'react';
import AppHeader from './AppHeader'
import ContentPage from './ContentPage';

const MainApp = (props) => {
    return <Fragment>
        <AppHeader />
        <ContentPage /> 
    </Fragment>
};

export default MainApp;