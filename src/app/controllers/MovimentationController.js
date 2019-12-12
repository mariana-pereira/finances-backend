const { Movimentation, Account, Company } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const { amount } = req.body;
            const value = '-' + amount;

            await Movimentation.create({
                ...req.body,
                user_id: req.userId,
                account_id: req.headers.target_id,
                type: 'Transferência'
            });

            await Movimentation.create({
                ...req.body,
                amount: value,
                user_id: req.userId,
                account_id: req.headers.origin_id,
                type: 'Transferência'
            });

            const origin = await Movimentation.sum('amount', { where: { account_id: req.headers.origin_id } });
                
            await Account.update({
                account_balance: origin
            } , {
                where: {
                    id: req.headers.origin_id
                }
            });

            const target = await Movimentation.sum('amount', { where: { account_id: req.headers.target_id } });
                
            await Account.update({
                account_balance: target
            } , {
                where: {
                    id: req.headers.target_id
                }
            });

            return res.status(200).send({ message: 'Success on money transfer' });;

        } catch (err) {
            return res.status(400).send({ error: 'Error creating movimentation' });

        }
    },

    async show(req, res) {
        try {
            const movimentation = await Movimentation.findByPk(req.params.id, {
                include: [
                    { model: Account, as: 'account' },
                    { model: Company, as: 'company' },
                ],
            })

            return res.json(movimentation);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentation' });
        }
    },

    async index(req, res) {
        try {
            const movimentations = await Movimentation.findAll({
                where: { user_id: req.userId },
                include: [
                    { model: Account, as: 'account' },
                    { model: Company, as: 'company' },
                ],
                order: [['date', 'DESC']]
            });

            const total = await Movimentation.sum('amount', { where: { user_id: req.userId } });

            return res.json({ movimentations, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    },

    async update(req, res) {
        try {

            const { date, amount, category } = req.body;

            await Movimentation.update({
                date,
                amount,
                category,
            }, {
                where: {
                    id: req.params.id
                }
            });

            const movimentations = await Movimentation.sum('amount', { where: { account_id: req.headers.account_id } });

            await Account.update({
                account_balance: movimentations
            }, {
                where: {
                    id: req.headers.account_id
                }
            });

            return res.status(200).send({ message: 'Movimentation sucessfuly updated' });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating movimentation' });
        }
    },

    async destroy(req, res) {
        try {
            await Movimentation.destroy({
                where: {
                    id: req.params.id
                }
            });

            const movimentations = await Movimentation.sum('amount', { where: { account_id: req.headers.account_id } });

            await Account.update({
                account_balance: movimentations
            }, {
                where: {
                    id: req.headers.account_id
                }
            });

            return res.status(200).send({ message: 'Movimentation sucessfuly deleted' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting movimentation' });
        }
    }
}