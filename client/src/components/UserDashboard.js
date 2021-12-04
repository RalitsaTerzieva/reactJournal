import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { useConfirm } from "material-ui-confirm";
import { apiService } from '../services/apiService'
import { format } from 'date-fns'

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: { // disable border when focusing on datagrid cells
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
}));

export const UserDashboard = () => {
    const [entries, setEntries] = useState([]);
    const [pageSize, setPageSize] = React.useState(5);
    const confirm = useConfirm();
    const classes = useStyles();

    const handleDelete = itemId => {
        confirm({ description: `This will permanently delete entry ${itemId}.` })
          .then(async () => {
              await apiService.deleteEntry(itemId);
              setEntries(entries.filter(item => item.id !== itemId)) // remove the deleted item from data to refresh table
          })
          .catch(() => {});
      };

    useEffect(() => {
        async function fetchData() {
            const entriesRows = await apiService.getEntries();
            setEntries(entriesRows);
        }
        fetchData();
    }, [entries]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 60, align: 'center' },
        {
            field: 'date', headerName: 'Date', width: 120, align: 'center', valueFormatter: (params) => {
                return format(new Date(params.value), 'dd.MM.yyyy');
            },
        },
        { field: 'topic', headerName: 'Topic', flex: 0.5 },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'sleep', headerName: 'Sleep', width: 80, align: 'right', valueFormatter: (params) => {
                return `${params.value || 0} 🕒`;
            },
        },
        {
            field: 'wc', headerName: 'WC', width: 80, align: 'right', valueFormatter: (params) => {
                return `${params.value || 0} 🚽`;
            },
        },
        {
            field: 'weight', headerName: 'Weight', width: 100, align: 'right', valueFormatter: (params) => {
                return `${params.value || 0} kg ⚖️`;
            },
        },
        {
            field: 'workout', headerName: 'Workout', width: 80, align: 'center', valueFormatter: (params) => {
                if (params.value) {
                    return '✔️'
                } else {
                    return '❌'
                }
            },
        },
        {
            field: 'actions', headerName: '', flex: 0.2, align: 'center', sortable: false,
            renderCell: (params) => {
                return <>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton aria-label="edit" size="small" title="edit" href={`/entries/${params.id}`}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" color="error" title="delete" onClick={() => handleDelete(params.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    
                </>;
            }
        },
    ];

    return <Grid container spacing={0}>
        <Grid item xs={3}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>card 1</Paper>
        </Grid>
        <Grid item xs={3}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>card 2</Paper>
        </Grid>
        <Grid item xs={3}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>card 3</Paper>
        </Grid>
        <Grid item xs={3}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>card 4</Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{ m: 2 }}>
                
                <DataGrid className={classes.root} rows={entries} columns={columns} pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination autoHeight disableSelectionOnClick />
            </Paper>
        </Grid>
    </Grid>

}

export default UserDashboard;