const { Expense } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const expenses = await Expense.findAll({ where: { invoice_id: req.headers.invoice_id } });
            const total = await Expense.sum('amount', { where: { invoice_id: req.headers.invoice_id } });
    
            return res.json({ expenses, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading expenses' });
        }
    }
}