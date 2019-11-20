const { Item } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const item = await Item.create({ ...req.body, expense_id: req.headers.expense_id });
            return res.json(item);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating item' });

        }
    },

    async index(req, res) {
        try {
            const items = await Item.findAll({ where: { expense_id: req.headers.expense_id } });
            const total = await Item.sum('amount', { where: { expense_id: req.headers.expense_id } });

            return res.json({ items, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading items' });
        }
    },

    async destroy(req, res) {
        try {
            await Item.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send({ message: 'Item sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting item' });
        }
    }
}