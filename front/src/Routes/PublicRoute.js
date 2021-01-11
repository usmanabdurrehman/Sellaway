import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {

	let token = localStorage.getItem('token')?true:false

    return (
        <Route {...rest} render={props => (
            !token ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PublicRoute;