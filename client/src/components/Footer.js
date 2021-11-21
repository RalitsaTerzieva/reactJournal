import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <BottomNavigation style={{backgroundColor: "#BAE3D1", width: '100%', position: 'fixed', bottom: 0}} showLabels>
            <BottomNavigationAction label="ReactJournal 2021" icon={<CopyrightIcon/>}/>
        </BottomNavigation>
    );
};

export default Footer;