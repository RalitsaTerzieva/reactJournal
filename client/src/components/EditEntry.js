import Main from './Main';
import EntryForm from './EntryForm'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { useSelector, useDispatch } from 'react-redux';
import { updateEntry } from '../redux/entrySlice';
import { showMessage } from '../redux/messageSlice';
import { useNavigate } from 'react-router-dom';
import { convertTimeToNum, convertNumToTime } from '../services/time';

import { useParams } from "react-router-dom";

const EditEntry = () => {
    const error = useSelector((state) => state.entry.updateError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [entry, setEntry] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            let entryData = await apiService.getEntry(id);
            entryData = {...entryData,
                wc: entryData.wc || 0,
                sleep: convertNumToTime(entryData.sleep || 0),
                weight: entryData.weight || 0,
                workout: !!entryData.workout,
            }
            setEntry(entryData);
        }
        fetchData();
    }, [id]);

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
                <Typography variant='h4' sx={{ mb: 3 }}>Entry {entry && entry.id}</Typography>
                <EntryForm onSubmit={async (values, actions) => {
                    // Convert from time string to float before submit
                    values.sleep = convertTimeToNum(values.sleep)

                    const response = await dispatch(updateEntry({id, values}));
                    if (!response.payload.error) {
                        actions.resetForm()
                        navigate("/")
                        dispatch(showMessage({
                            message: `Successfully updated entry ${response.payload.id}`
                        }))
                    }
                }} error={error} initialValues={entry} />
            </Paper>
        </Main>
    )
}

export default EditEntry;