const { Account } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const account = await Account.create({ ...req.body, user_id: req.userId });
            return res.send({ account });

        } catch (err) {
            return res.status(400).send({ error: 'Error creating account' });

        }
    },

    async show(req, res) {
        try {
            const account = await Account.findByPk(req.params.id);

            return res.send({ account });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading account' });
        }
    },

    async index(req, res) {
        try {
            const accounts = await Account.findAll({ where: { user_id: req.userId } });

            return res.json(accounts);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading accounts' });
        }
    },

    async update(req, res) {
        try {

            const { bank, branch, account_number, type } = req.body;

            await Account.update({
                bank,
                branch,
                account_number,
                type,
            }, {
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Account sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating account' });
        }
    },

    async destroy(req, res) {
        try {
            await Account.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Account sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting account' });
        }
    }
}