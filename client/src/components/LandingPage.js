import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { setRegisterVisible } from '../redux/authSlice';
import { useDispatch } from 'react-redux'
import { apiService } from '../services/apiService';
import React, { useEffect, useState } from 'react';


const LandingPage = () => {
    const [stats, setStats] = useState({userCount: 0, entryCount: 0});
    const dispatch = useDispatch();
    

    useEffect(() => {
        async function fetchData() {
            let statsData = await apiService.getStats();
            setStats(statsData);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="vimeo-wrapper">
                <iframe title="notebook" src="//player.vimeo.com/video/538703414?background=1&autoplay=1&loop=1&byline=0&title=0"
                    frameBorder="0" allowFullScreen></iframe>
            </div>
            <Stack direction="column" spacing={8} sx={{justifyContent: 'center', alignItems: 'center', width: '70vw', mb: 5}}>
                <Typography variant="h3" sx={{color: '#fff', fontSize: '2em', mt: "1em" }}>Join <Box component="span" sx={{color: "#BAE3D1"}}>{stats.userCount}</Box> happy users who recorded <Box component="span" sx={{color: "#BAE3D1"}}>{stats.entryCount}</Box> days. Start tracking your life today</Typography>
                <Card sx={{opacity: 0.8, width: "50vw", height: "auto", p: 2, borderRadius: 3}}>
                    <CardContent>
                        <Typography variant="h4" sx={{fontSize: "1.5em" }}>„Health is not about the weight you lose. It's about the life you gain“</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button sx={{fontSize: '0.7em'}} size="large" variant="contained" color="success" onClick={() => dispatch(setRegisterVisible(true))}>Explore life here</Button>
                    </CardActions>
                </Card>
            </Stack>
            
        </>
    )
}

export default LandingPage;