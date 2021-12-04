import Main from './Main';
import EntryForm from './EntryForm'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { convertNumToTime } from '../services/time';

import { useParams } from "react-router-dom";

const EntryDetails = () => {
    const [entry, setEntry] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const entryData = await apiService.getEntry(id);
            entryData.sleep = convertNumToTime(entryData.sleep || 0);
            console.log(entryData)
            setEntry(entryData);
        }
        fetchData();
    }, []);

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
                <EntryForm onSubmit={()=>{}} error={null} values={entry} readonly={true} />
            </Paper>
        </Main>
    )
}

export default EntryDetails;