const { Invoice } = require('../models');

module.exports = {
    
    async index(req, res) {
        try {
            const invoices = await Invoice.findAll({ where: { month: req.headers.month, year: req.headers.year, user_id: req.userId } });
            const total = await Invoice.sum('invoice_amount', { where: { month: req.headers.month, year: req.headers.year, user_id: req.userId } });

            return res.json({invoices, total});

        } catch (err) {
            return res.status(400).send({ error: 'Error loading invoices' });
        }
    },

    async update(req, res) {
        try {
            await Invoice.update({
                paid: true,
            }, {
                    where: {
                        id: req.params.id
                    }
                });
    
            return res.status(200).send({ message: 'Invoice sucessfuly paid' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error paying invoice' });
        }
    }
}