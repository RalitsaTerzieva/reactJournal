import CopyrightIcon from '@mui/icons-material/Copyright';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
        <Box style={{backgroundColor: "#BAE3D1", width: '100%', height: "48px", position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <Stack direction="row" alignItems="center" sx={{color: "#fff"}}>
                <CopyrightIcon/> ReactJournal {new Date().getFullYear()} 
            </Stack>
        </Box>
    );
};

export default Footer;