import model from '../models';
const { Entry } = model;

export default {
    async create(data) {
        this.validate(data)
        const entry = await Entry.create(data)
        return entry
    },
    async delete(entry) {
        entry.destroy()
    },
    validate(data) {
        if (!!!data.date) {
            throw new Error("Please enter a valid date");
        }
        if (!!!data.description) {
            throw new Error("Please enter a valid description");
        }
    }
}