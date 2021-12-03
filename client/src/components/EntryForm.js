import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';


const validationSchema = yup.object({
    date: yup
        .string('Enter a date')
        .required('Date is required'),
    description: yup
        .string('Enter a valid description')
        .min(20, 'Description should be of minimum 20 characters length')
        .required('Description is required'),
    topic: yup
        .string('Enter a valid topic')
        .min(5, 'Topic should be of minimum 5 characters length')
        .required('Topic is required'),
});


export const EntryForm = ({ onSubmit, error, initialValues = {
    date: (new Date()).toString(),
    description: '',
    topic: '',
    sleep: '',
    wc: '',
    weight: '',
    workout: false,
    symptoms: '',
    breakfast: '',
    lunch: '',
    snack: '',
    dinner: ''
} }) => {
    //const entryError = useSelector((state) => state.entry.entryError);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {error && <Grid item xs={12}><Alert severity="error" sx={{ mb: 2 }}>{error}</Alert></Grid>}

                <Grid item xs={12} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={formik.values.date}
                            onChange={val => { formik.setFieldValue("date", val.toISOString()) }}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        fullWidth
                        margin="dense"
                        id="topic"
                        name="topic"
                        label="Topic"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.topic}
                        onChange={formik.handleChange}
                        error={formik.touched.topic && Boolean(formik.errors.topic)}
                        helperText={formik.touched.topic && formik.errors.topic}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        fullWidth />
                </Grid>
                <Grid item xs={6} lg={3}>
                    <TextField
                        id="sleep"
                        label="Sleep"
                        type="time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        margin='dense'
                        fullWidth
                        value={formik.values.sleep}
                        onChange={formik.handleChange}
                        error={formik.touched.sleep && Boolean(formik.errors.sleep)}
                    />
                </Grid>
                <Grid item xs={6} lg={3}>
                    <TextField
                        label="Weight"
                        type="number"
                        value={formik.values.weight}
                        InputProps={{ inputProps: { min: 10, max: 300, step: '.1' } }}
                        onChange={e => { formik.setFieldValue("weight", Number(e.target.value)) }}
                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                        margin='dense'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={3}>
                    <TextField
                        label="wc"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 10, step: '1' } }}
                        value={formik.values.wc}
                        onChange={e => { formik.setFieldValue("wc", Number(e.target.value)) }}
                        error={formik.touched.wc && Boolean(formik.errors.wc)}
                        margin='dense'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={3} sx={{ alignItems: 'center', display: 'flex' }}>
                    <FormControlLabel control={
                        <Switch checked={formik.values.workout} value={formik.values.workout} onChange={e => { formik.setFieldValue("workout", e.target.checked) }} />
                    } label="Workout" />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        id="breakfast"
                        label="Breakfast"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.breakfast}
                        onChange={formik.handleChange}
                        error={formik.touched.breakfast && Boolean(formik.errors.breakfast)}
                        helperText={formik.touched.breakfast && formik.errors.breakfast}
                        fullWidth />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        id="lunch"
                        label="Lunch"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.lunch}
                        onChange={formik.handleChange}
                        error={formik.touched.lunch && Boolean(formik.errors.lunch)}
                        helperText={formik.touched.lunch && formik.errors.lunch}
                        fullWidth />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        id="snack"
                        label="Snack"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.snack}
                        onChange={formik.handleChange}
                        error={formik.touched.snack && Boolean(formik.errors.snack)}
                        helperText={formik.touched.snack && formik.errors.snack}
                        fullWidth />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        id="dinner"
                        label="Dinner"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.dinner}
                        onChange={formik.handleChange}
                        error={formik.touched.dinner && Boolean(formik.errors.dinner)}
                        helperText={formik.touched.dinner && formik.errors.dinner}
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button style={{ backgroundColor: "#BAE3D1" }} variant="contained" type="submit" size="large">
                        Save
                    </Button>
                </Grid>
            </Grid>

        </form>
    )
}

export default EntryForm;