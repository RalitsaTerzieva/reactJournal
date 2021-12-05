import Box from '@mui/material/Box';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ToastMessage from '../components/ToastMessage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'

const Main = ({children}) => {
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if(user) {
            document.getElementsByTagName('html')[0].setAttribute("style", "background: url('/images/notebook.jpg') no-repeat center center fixed; background-size: cover;");
        } else {
            document.getElementsByTagName('html')[0].setAttribute("style", "background: url('/images/background.png') no-repeat center center fixed; background-size: cover;");
        }
    }, [user])

    return (
        <Box>
            <Header />
            <ToastMessage />
            {children}
            <Footer />
        </Box>
    )
}

export default Main;