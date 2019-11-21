const { Movimentation } = require('../models');
const sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const bonus = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Bonificação'
                }
            });

            const cashback = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Cashback'
                }
            });

            const extra = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Extra'
                }
            });

            const profit = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Rendimento'
                }
            });

            const salary = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Salário'
                }
            });

            const other = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Outros'
                }
            });

            const shopping = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Compras'
                }
            });
    
            const subscription = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Pagamento de Mensalidade'
                }
            });
    
            const invoice = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Pagamento de Fatura'
                }
            });
    
            const withdrawal = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Saque'
                }
            });

            return res.json({ bonus, cashback, extra, profit, salary, other, shopping, subscription, invoice, withdrawal });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    }
}