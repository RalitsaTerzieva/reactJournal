import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';

import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setLoginVisible, setRegisterVisible, register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { showMessage } from '../redux/messageSlice';

const Header = () => {
  const loginVisible = useSelector((state) => state.auth.loginVisible);
  const user = useSelector((state) => state.auth.user);
  const registerVisible = useSelector((state) => state.auth.registerVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpenLogin = () => {
    dispatch(setLoginVisible(true));
  };

  const handleCloseLogin = () => {
    dispatch(setLoginVisible(false));
  };

  const handleClickOpenRegister= () => {
    dispatch(setRegisterVisible(true));
  };

  const handleCloseRegister = () => {
    dispatch(setRegisterVisible(false));
  };

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: "#BAE3D1"}} position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} href="/">
            <HomeIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}></Box>
          <Stack direction="row" spacing={2} alignItems="center">
            {user && <Typography color="inherit">Welcome, {user.first_name} {user.last_name}</Typography>}
            <Button color="inherit" href="/about">
              About
            </Button>
            {!user && <Button color="inherit" onClick={handleClickOpenLogin}>Login</Button>}
            {!user && <Button color="inherit" onClick={handleClickOpenRegister}>Register</Button>}
            {user && <Button color="inherit" href="/entries/create">Create Entry</Button>}
            {user && <Button color="inherit" onClick={
              async () => {
                const logoutMessage = `Goodbye, ${user.first_name}`;
                await dispatch(logout())
                navigate("/")
                dispatch(showMessage({
                  message: logoutMessage,
                  duration: 3000,
                }))
              }
              }>Log out</Button>}
          </Stack>
        </Toolbar>
      </AppBar>

      <LoginDialog open={loginVisible} onClose={handleCloseLogin} onSubmit={(values, actions) => dispatch(login({values, actions}))}></LoginDialog>
      <RegisterDialog open={registerVisible} onClose={handleCloseRegister} onSubmit={(values, actions) => dispatch(register({values, actions}))}></RegisterDialog>
    </Box>
  );
}

export default Header;