import Box from '@mui/material/Box';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ToastMessage from '../components/ToastMessage';

const Main = ({children}) => {
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