import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';

const Header = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleClickOpenRegister= () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: "#BAE3D1"}} position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Notes
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={handleClickOpenLogin}>Login</Button>
            <Button color="inherit" onClick={handleClickOpenRegister}>Register</Button>
            <Button href="/logout" color="inherit">Log out</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <LoginDialog open={openLogin} onClose={handleCloseLogin} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}></LoginDialog>
      <RegisterDialog open={openRegister} onClose={handleCloseRegister} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}></RegisterDialog>
      
    </Box>
  );
}

export default Header;