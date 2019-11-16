const { Company } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const company = await Company.create({ ...req.body, user_id: req.userId });
            return res.send(company);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating company' });

        }
    },

    async show(req, res) {
        try {
            const company = await Company.findByPk(req.params.id);

            return res.send(company);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading company' });
        }
    },

    async index(req, res) {
        try {
            const companies = await Company.findAll({ where: { user_id: req.userId } });

            return res.json(companies);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading companies' });
        }
    },

    async update(req, res) {
        try {

            const { name } = req.body;

            await Company.update({
                name
            }, {
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Company sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating company' });
        }
    },

    async destroy(req, res) {
        try {
            await Company.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Company sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting company' });
        }
    }
}