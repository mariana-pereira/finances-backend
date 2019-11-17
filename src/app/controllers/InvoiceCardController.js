const { Invoice, Card } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const invoices = await Invoice.findAll({
                where: { card_id: req.headers.id, paid: req.headers.paid },
                include: [
                    { model: Card, as: 'card' },
                ],
                order: [['expiry_date', 'DESC']]
            });
            const total = await Invoice.sum('invoice_amount', { where: { card_id: req.headers.id, paid: req.headers.paid } });

            return res.json({ invoices, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading invoices' });
        }
    }
}