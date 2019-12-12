const { Budget } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const budget = await Budget.create({ ...req.body, user_id: req.userId });
            return res.json(budget);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating budget' });

        }
    },

    async show(req, res) {
        try {
            const budget = await Budget.findByPk(req.params.id);

            return res.json(budget);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading budget' });
        }
    },

    async index(req, res) {
        try {
            const budgets = await Budget.findAll({ where: { month: req.headers.month, year: req.headers.year, user_id: req.userId } });
            const total = await Budget.sum('amount', { where: { month: req.headers.month, year: req.headers.year, user_id: req.userId } });
    
            return res.json({ budgets, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading budgets' });
        }
    },

    async update(req, res) {
        try {

            const { name, amount } = req.body;

            await Budget.update({
                name,
                amount
            }, {
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Budget sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating budget' });
        }
    },

    async destroy(req, res) {
        try {
            await Budget.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Budget sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting budget' });
        }
    }
}