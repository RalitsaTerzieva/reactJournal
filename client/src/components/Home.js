import Box from '@mui/material/Box';

import Main from './Main';
import LandingPage from './LandingPage';
import UserDashboard from './UserDashboard';
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Main>
            {user && <UserDashboard />}
            {!user && <Box style={{minHeight: "86vh", marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LandingPage />
            </Box>}
        </Main>
    );
};

export default Home;