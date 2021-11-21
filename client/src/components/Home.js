import Box from '@mui/material/Box';

import Main from './Main';
import BasicCard from './Card';

const Home = () => {
    return (
        <Main>
            <Box style={{minHeight: "86vh", marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <BasicCard sx={{opacity: 0.9, width: "50vw", height: "auto"}} />
            </Box>
        </Main>
    );
};

export default Home;