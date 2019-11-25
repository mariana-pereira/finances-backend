const { Expense, Invoice, Card } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const expense = await Expense.create({ ...req.body, invoice_id: req.headers.invoice_id, card_id: req.headers.card_id, user_id: req.userId });

            const amount = parseFloat(await Expense.sum('amount', { where: { invoice_id: req.headers.invoice_id } }));

            await Invoice.update({
                invoice_amount: amount
            }, {
                where: {
                    id: req.headers.invoice_id
                }
            });

            const invoices = await Invoice.sum('invoice_amount', { where: { paid: false, card_id: req.headers.card_id } });
            const { total_limit } = await Card.findByPk(req.headers.card_id);

            const total = parseFloat(total_limit) - parseFloat(invoices);

            await Card.update({
                available_limit: total
            }, {
                where: {
                    id: req.headers.card_id
                }
            });

            return res.json(expense);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating expense' });

        }
    },

    async show(req, res) {
        try {
            const expense = await Expense.findByPk(req.params.id, {
                include: [
                    { model: Invoice, as: 'invoice' },
                    { model: Card, as: 'card' },
                ]
            });

            return res.send({ expense });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading expense' });
        }
    },

    async index(req, res) {
        try {
            const expenses = await Expense.findAll({ where: { invoice_id: req.headers.invoice_id } });
            const total = await Expense.sum('amount', { where: { invoice_id: req.headers.invoice_id } });

            return res.json({ expenses, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading expenses' });
        }
    },

    async update(req, res) {
        try {

            const { date, amount, shop, category } = req.body;

            await Expense.update({
                date,
                amount,
                shop,
                category
            }, {
                where: {
                    id: req.params.id
                }
            });

            const ExpenseAmount = await Expense.sum('amount', { where: { invoice_id: req.headers.invoice_id } });

            await Invoice.update({
                invoice_amount: ExpenseAmount
            }, {
                where: {
                    id: req.headers.invoice_id
                }
            });

            const invoices = await Invoice.sum('invoice_amount', { where: { paid: false, card_id: req.headers.card_id } });
            const { total_limit } = await Card.findByPk(req.headers.card_id);

            const total = parseFloat(total_limit) - parseFloat(invoices);

            await Card.update({
                available_limit: total
            }, {
                where: {
                    id: req.headers.card_id
                }
            });

            return res.status(200).send({ message: 'Expense sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating expense' });
        }
    },

    async destroy(req, res) {
        try {
            await Expense.destroy({
                where: {
                    id: req.params.id
                }
            });

            const ExpenseAmount = parseFloat(await Expense.sum('amount', { where: { invoice_id: req.headers.invoice_id } }));

            await Invoice.update({
                invoice_amount: ExpenseAmount
            }, {
                where: {
                    id: req.headers.invoice_id
                }
            });

            const invoices = await Invoice.sum('invoice_amount', { where: { paid: false, card_id: req.headers.card_id } });
            const { total_limit } = await Card.findByPk(req.headers.card_id);

            const total = parseFloat(total_limit) - parseFloat(invoices);

            await Card.update({
                available_limit: total
            }, {
                where: {
                    id: req.headers.card_id
                }
            });

            return res.status(200).send({ message: 'Expense sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting expense' });
        }
    }
}