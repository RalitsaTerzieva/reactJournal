import Main from './Main';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const About = () => {
    return (
       <Main>
           
           <Paper elevation={1} sx={{
               m: 2, 
               p: 5,
               ml: 'auto',
               mr: 'auto',
               width: '60vw',
               backgroundColor: '#FFFAFA',
      }}>
          <Typography variant='h4' sx={{mb: 3}}>Our mission</Typography>
          <Stack direction="row" spacing={4}>
            <Box sx={{textAlign: 'justify'}}>
            “Let food be the medicine and medicine be thy food.” – Hippocrates.
    This amazing quotes defines our mission and goal. Our Journal Application is created in November 2021 to your true friend that will help you building healthy daily routine. 
    Your life will be changed. You will be happy and healthy. You just need to fullfuild every field every day and to monitor your life and progress. 
    It will help you to catch something that is not healthy for you.
    Everyone have to ask yourself what is the most important thing. We believe that happiness come trough good lifestyle and health body and mind. We spent so many years to live healthy and to follow a daily routine that was very helpful for us.
    Firstly we started this journey with only one notebook and pencil. Secondly it become so bigger that all of my bookshelfs was full with notebooks with information about our lifestyle. We wrote down everything and we noticed so many things about us.
    When you start to write down your day, it becomes more and more clearer what is wrong and right for you and how are you feeling during every day. For many peaople this is a obligation but we don't think that health is just a obligation. Health is the path to everything in life.
            </Box>
            <Box>
                <iframe title="location" width="500" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Central%20park,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </Box>
            </Stack>
           </Paper>
       </Main>
    );
};

export default About;