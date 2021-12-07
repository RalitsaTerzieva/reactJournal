import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { useConfirm } from "material-ui-confirm";
import { apiService } from '../services/apiService';
import { convertNumToTime } from '../services/time';
import { format } from 'date-fns'

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { LineChart } from './LineChart';

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
    const navigate = useNavigate();

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
            setEntries(entriesRows.map((item) => {
                return {...item,
                        wc: item.wc || 0,
                        sleep: item.sleep || 0,
                        weight: item.weight || 0,
                        workout: !!item.workout,
                    }
            }));
        }
        fetchData();
    }, []);

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
            field: 'sleep', headerName: 'Sleep', width: 90, align: 'right', valueFormatter: (params) => {
                return `${convertNumToTime(params.value || 0)} h 🕒`;
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
                return <div onClick={(e) => {e.stopPropagation() } }>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton aria-label="detils" size="small" title="details" href={`/entries/details/${params.id}`}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="edit" size="small" title="edit" href={`/entries/${params.id}`}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" color="error" title="delete" onClick={() => handleDelete(params.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    
                </div>;
            }
        },
    ];

    return <Grid container spacing={0} sx={{mb: 4}}>
        <Grid item xs={4}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <LineChart data={entries.slice(0, 10).reverse()} dataKey='wc' />
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <LineChart data={entries.slice(0, 10).reverse()} dataKey='weight' />
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <Paper sx={{ m: 2, height: "200px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <LineChart  data={entries.slice(0, 10).reverse()} dataKey='sleep' tooltipFormatter={(value, name, props) => `${convertNumToTime(value)} h`} />
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper sx={{ m: 2 }}>
                <DataGrid density="compact" className={classes.root} rows={entries} columns={columns} pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowClick={(params, event) => {
                        navigate(`/entries/details/${params.row.id}`);
                    }}
                    pagination autoHeight disableSelectionOnClick />
            </Paper>
        </Grid>
    </Grid>

}

export default UserDashboard;