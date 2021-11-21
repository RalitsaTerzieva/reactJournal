import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const BasicCard = ({sx}) => {
    return (
        <Card sx={{...sx}}>
            <CardContent>
                <Typography variant="h5">Health is not about the weight you lose. It's about the life you gain.</Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
                <Button size="small">Explore life here</Button>
            </CardActions>
        </Card>
    )
}

export default BasicCard;