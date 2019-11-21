const { Movimentation, Account, Company } = require('../models');
const sequelize = require('sequelize');
const { Op } = Sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const bonus = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Bonificação' }
                    ]
                }
            });

            const cashback = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Cashback' }
                    ]
                }
            });

            const extra = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Extra' }
                    ]
                }
            });

            const profit = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Rendimento' }
                    ]
                }
            });

            const salary = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Salário' }
                    ]
                }
            });

            const other = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Outros' }
                    ]
                }
            });

            const shopping = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Compras' }
                    ]
                }
            });

            const subscription = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Pagamento de Mensalidade' }
                    ]
                }
            });

            const invoice = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Pagamento de Fatura' }
                    ]
                }
            });

            const withdrawal = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId },
                        { category: 'Saque' }
                    ]
                }
            });

            return res.json({ shopping, subscription, invoice, withdrawal, bonus, cashback, extra, profit, salary, other });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    }
}