import model from '../models';
const { Entry } = model;
import { ValidationError } from '../utils/errors';

export default {
    async create(data) {
        this.validate(data)
        const entry = await Entry.create(data)
        return entry
    },
    async update(entry, data) {
        this.validate(data);
        entry.set(data);
        await entry.save();
    },
    async delete(entry) {
        entry.destroy()
    },
    validate(data) {
        if (!!!data.date) {
            throw new ValidationError("Please enter a valid date");
        }
        if (!!!data.description) {
            throw new ValidationError("Please enter a valid description");
        }
    }
}