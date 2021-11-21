import Box from '@mui/material/Box';

import Header from '../components/Header';
import Footer from '../components/Footer';


const Main = ({children}) => {
    return (
        <Box>
            <Header />
            {children}
            <Footer />
        </Box>
    )
}

export default Main;