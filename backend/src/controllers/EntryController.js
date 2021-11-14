import model from '../models';
const { Entry, User } = model;
// import entryService from '../services/EntryService'

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
        // TODO: validation
        try {
            const entry = await Entry.create(req.body)
            res.send(entry)
        } catch(e) {
            console.log(e);
            return res.status(500)
            .send(
                {message: 'Could not perform operation at this time, kindly try again later.'});
        }
  },
  updateEntry(req, res) {
  },
  deleteEntry(req, res) {
  },
  async showEntry(req, res) {
    const entry = await Entry.findByPk(req.params.id, entryFindOptions);

    if(!entry) {
        return res.status(404).send({message: 'Not found'});
    } else {
        return res.send(entry);
    }
  },
  async listEntries(req, res) {
    const allEntries = await Entry.findAll(entryFindOptions);
    if(!allEntries) {
        return res.status(404).send({message: 'Not found'});
    } else {
        return res.send(allEntries);
    }
},
}