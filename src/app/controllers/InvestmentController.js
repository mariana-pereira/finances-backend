const { Investment, Account, Target, Profit, Movimentation } = require('../models');

module.exports = {
    async store(req, res) {
        try {

            const investment = await Investment.create({ ...req.body, account_id: req.headers.account_id, user_id: req.userId, total_amount: req.body.application_amount });

            const amount = req.body.application_amount;
            const value = '-' + amount;

            await Movimentation.create({
                date: new Date(),
                user_id: req.userId,
                account_id: req.headers.account_id,
                amount: value,
                type: 'Débito',
                category: 'Investimento'
            });

            const investment_target = await Investment.sum('total_amount', { where: { target_id: investment.target_id } });
            const movimentations = await Movimentation.sum('amount', { where: { account_id: req.headers.account_id } });

            await Target.update({
                actual_amount: investment_target,
            }, {
                where: {
                    id: investment.target_id
                }
            });

            const investment_account = await Investment.sum('total_amount', { where: { account_id: investment.account_id } });
    
            await Account.update({
                investments_balance: investment_account,
                account_balance: movimentations
            } , {
                where: {
                    id: investment.account_id
                }
            });

            return res.json(investment);

        } catch (err) {
            return res.status(400).send({ error: 'Error creating investment' });

        }
    },

    async show(req, res) {
        try {
            const investment = await Investment.findByPk(req.params.id, {
                include: [
                    { model: Account, as: 'account' },
                    { model: Target, as: 'target' },
                ]
            });

            return res.json(investment);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading investment' });
        }
    },

    async index(req, res) {
        try {
            const investments = await Investment.findAll({
                where: { user_id: req.userId },
                include: [
                    { model: Account, as: 'account' },
                    { model: Target, as: 'target' },
                ]
            });
            const total = await Investment.sum('total_amount', { where: { user_id: req.userId } });

            return res.json({ investments, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading investments' });
        }
    },

    async update(req, res) {
        try {

            const { name, type, tax, application_date, redeem_date, application_amount } = req.body;

            const profits = await Profit.sum('amount', { where: { investment_id: req.params.id } });

            const total = parseFloat(profits) + parseFloat(application_amount);
            
            await Investment.update({
                name,
                type,
                tax,
                application_date,
                redeem_date,
                application_amount,
                total_amount: total
            }, {
                where: {
                    id: req.params.id
                }
            });

            const investment_target = await Investment.sum('total_amount', { where: { target_id: req.headers.target_id } });

            await Target.update({
                actual_amount: investment_target,
            }, {
                where: {
                    id: req.headers.target_id
                }
            });

            const investment_account = await Investment.sum('total_amount', { where: { account_id: req.headers.account_id } });
    
            await Account.update({
                investments_balance: investment_account
            } , {
                where: {
                    id: req.headers.account_id
                }
            });

            return res.status(200).send({ message: 'Investment sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating investment' });
        }
    },

    async destroy(req, res) {
        try {
            await Investment.destroy({
                where: {
                    id: req.params.id
                }
            });

            const investment_target = await Investment.sum('total_amount', { where: { target_id: req.headers.target_id } });

            await Target.update({
                actual_amount: investment_target,
            }, {
                where: {
                    id: req.headers.target_id
                }
            });

            const investment_account = await Investment.sum('total_amount', { where: { account_id: req.headers.account_id } });
    
            await Account.update({
                investments_balance: investment_account
            } , {
                where: {
                    id: req.headers.account_id
                }
            });

            return res.status(200).send({ message: 'Investment sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting investment' });
        }
    }
}