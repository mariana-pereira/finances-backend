const { Invoice, Card } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const invoice = await Invoice.create({ ...req.body, card_id: req.headers.id, user_id: req.userId });
            return res.json(invoice);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error creating invoice' });
    
        }
    },

    async show(req, res) {
        try {
            const invoice = await Invoice.findByPk(req.params.id);
    
            return res.json(invoice);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading invoice' });
        }
    },

    async index(req, res) {
        try {
            const invoices = await Invoice.findAll({
                where: { user_id: req.userId },
                include: [
                    { model: Card, as: 'card' },
                ],
                order: [['expiry_date', 'DESC']]
            });
    
            return res.json(invoices);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading invoices' });
        }
    },

    async update(req, res) {
        try {

            const { name, month, year, expiry_date } = req.body;
    
            await Invoice.update({
                name,
                month,
                year,
                expiry_date,
            }, {
                    where: {
                        id: req.params.id
                    }
                });
    
            return res.status(200).send({ message: 'Invoice sucessfuly updated' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error updating invoice' });
        }
    },

    async destroy(req, res) {
        try {
            await Invoice.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            return res.status(200).send({ message: 'Invoice sucessfuly deleted' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error deleting invoice' });
        }
    }
}