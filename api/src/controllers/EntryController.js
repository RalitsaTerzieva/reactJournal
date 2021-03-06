import model from '../models';

const { Entry, User } = model;

import entryService from '../services/EntryService';
import { ValidationError } from '../utils/errors';


const entryFindOptions = {
    attributes: {
        exclude: ['user_id']
    },
    include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'email', 'first_name', 'last_name']
    }]
}

export default {
    async createEntry(req, res) {
        try {
            const entry = await entryService.create({...req.body, user_id: req.user._id})
            res.send(entry)
        } catch (e) {
            if (e instanceof ValidationError) {
                return res.status(403)
                .send(
                    { message: e.message });
            } else {
                console.log(e)
                return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
            }
        }
    },
    async updateEntry(req, res) {
        console.log(req.user)
        const entry = await Entry.findByPk(req.params.id)
        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            await entryService.update(entry, req.body)
            res.send({ message: 'Successfully updated', id: req.params.id })
        } catch (e) {
            if (e instanceof ValidationError) {
                return res.status(403)
                .send(
                    { message: e.message });
            } else {
                return res.status(500)
                .send(
                    { error: 'Could not perform operation at this time, kindly try again later.' });
            }
        }
    },
    async deleteEntry(req, res) {
        const entry = await Entry.findByPk(req.params.id)
        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            entryService.delete(entry)
            res.send({ message: 'Successfully deleted' })
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    },
    async showEntry(req, res) {
        const entry = await Entry.findByPk(req.params.id, entryFindOptions);

        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(entry);
        }
    },
    async listEntries(req, res) {
        const allEntries = await Entry.findAll({where: {user_id: req.user._id}, order: [['date', 'DESC']], ...entryFindOptions});
        if (!allEntries) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(allEntries);
        }
    },
}