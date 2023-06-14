import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import CreateContext from '../Components/CreateContex';
import LoadingComponents from '../Shared/LoadingComponents';

const useAuthAdmin = (WrappedComponent) => {


    return (props) => {
        const {
            // user,
            refresh
        } = useContext(CreateContext);

        // const userRole = user?.role;
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userRole = user?.role;
            if ( userRole !== 'admin') {
                Router.push('/auth/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default useAuthAdmin;
