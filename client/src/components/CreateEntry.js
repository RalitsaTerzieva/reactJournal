import Main from './Main';
import EntryForm from './EntryForm'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { createEntry } from '../redux/entrySlice';
import { showMessage } from '../redux/messageSlice';
import { useNavigate } from 'react-router-dom';

const CreateEntry = () => {
    const error = useSelector((state) => state.entry.createError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Main>
            <Paper elevation={1} sx={{
                m: 2,
                mb: 6,
                p: 5,
                ml: 'auto',
                mr: 'auto',
                width: '60vw',
                backgroundColor: '#FFFAFA',
            }}>
                <Typography variant='h4' sx={{ mb: 3 }}>Create Entry</Typography>
                <EntryForm onSubmit={async (values, actions) => {
                    const response = await dispatch(createEntry(values));
                    if (!response.payload.error) {
                        actions.resetForm()
                        navigate("/")
                        dispatch(showMessage({
                            message: `Successfully crated entry ${response.payload.id}`
                        }))
                    }
                }} error={error} />
            </Paper>
        </Main>
    )
}

export default CreateEntry;