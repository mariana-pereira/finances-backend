const { Profit, Investment, Target, Account } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const profit = await Profit.create({
                ...req.body,
                investment_id: req.headers.id
            });

            const profits = await Profit.sum('amount', { where: { investment_id: req.headers.id } });
            const investment = await Investment.findByPk(req.headers.id);

            const total = parseFloat(investment.application_amount) + parseFloat(profits);

            await Investment.update({
                profits_amount: profits,
                total_amount: total
            }, {
                where: {
                    id: req.headers.id
                }
            });

            const investment_amount = await Investment.sum('total_amount', { where: { target_id: investment.target_id } });

            await Target.update({
                actual_amount: investment_amount,
            }, {
                where: {
                    id: investment.target_id
                }
            });

            await Account.update({
                investments_balance: investment_amount
            } , {
                where: {
                    id: investment.account_id
                }
            });

            return res.json(profit);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating profit' });

        }
    },

    async index(req, res) {
        try {
            const profits = await Profit.findAll({ where: { investment_id: req.headers.id } });
            const total = await Profit.sum('amount', { where: { investment_id: req.headers.id } });

            return res.json({ profits, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading profits' });
        }
    },

    async destroy(req, res) {
        try {
            await Profit.destroy({
                where: {
                    id: req.params.id
                }
            });

            const profits = await Profit.sum('amount', { where: { investment_id: req.headers.investment_id } });
            const investment = await Investment.findByPk(req.headers.investment_id);

            const total = parseFloat(investment.application_amount) + parseFloat(profits);

            await Investment.update({
                profits_amount: profits,
                total_amount: total
            }, {
                where: {
                    id: req.headers.investment_id
                }
            });

            const investment_amount = await Investment.sum('total_amount', { where: { target_id: investment.target_id } });

            await Target.update({
                actual_amount: investment_amount,
            }, {
                where: {
                    id: investment.target_id
                }
            });

            await Account.update({
                investments_balance: total
            } , {
                where: {
                    id: investment.account_id
                }
            });

            return res.status(200).send({ message: 'Profit sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting profit' });
        }
    }
}