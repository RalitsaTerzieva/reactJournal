import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object({
  first_name: yup
    .string('Enter your first name')
    .min(2)
    .required('First name is required'),
  last_name: yup
    .string('Enter your last name')
    .min(2)
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required('Passwords must match')
});


export const RegisterDialog = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Register</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To register to this website, please enter your email address and password here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            id="first_name"
            name="first_name"
            label="First name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            fullWidth
            margin="dense"
            id="last_name"
            name="last_name"
            label="Last name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            margin="dense"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm password"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{backgroundColor: "#BAE3D1"}} variant="contained" type="submit">
            Register
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
        </form>
      </Dialog>
      )
}