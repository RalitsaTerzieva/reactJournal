import express from 'express';
import route from './src/routes'
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

const port = 5000;

app.listen(port, () => {
    console.log('App is now running at port ', port)
})