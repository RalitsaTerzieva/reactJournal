import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../redux/messageSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const ToastMessage = () => {
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(hideMessage())

    return <Snackbar open={message.messageOpen} autoHideDuration={message.autoHideDuration} onClose={handleClose}  anchorOrigin={{horizontal: "center", vertical: "top"}} sx={{width: '95vw'}}>
        <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
            {message.message}
        </Alert>
    </Snackbar>
}

export default ToastMessage