import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { setRegisterVisible } from '../redux/authSlice';
import { useDispatch } from 'react-redux'

const LandingPage = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="vimeo-wrapper">
                <iframe title="notebook" src="//player.vimeo.com/video/538703414?background=1&autoplay=1&loop=1&byline=0&title=0"
                    frameBorder="0" allowFullScreen></iframe>
            </div>
            <Stack direction="column" spacing={8} sx={{justifyContent: 'center', alignItems: 'center', width: '70vw'}}>
                <Typography variant="h2" sx={{color: '#fff' }}>Join 12 happy users. Start tracking your life today</Typography>
                <Card sx={{opacity: 0.8, width: "50vw", height: "auto", p: 2, borderRadius: 3}}>
                    <CardContent>
                        <Typography variant="h3">„Health is not about the weight you lose. It's about the life you gain“</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button size="large" variant="contained" color="success" onClick={() => dispatch(setRegisterVisible(true))}>Explore life here</Button>
                    </CardActions>
                </Card>
            </Stack>
            
        </>
    )
}

export default LandingPage;