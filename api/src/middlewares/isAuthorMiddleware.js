import model from '../models';
const { Entry } = model;

export default async (req, res, next) => {
    const entry = await Entry.findByPk(req.params.id)
    if(entry && entry.user_id == req.user._id) {
        next();
    } else {
        res.status(404).send({
            message: 'Not found!',
        })
    }
}