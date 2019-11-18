const { Expense, Card } = require('../models');
const sequelize = require('sequelize');
const { Op } = Sequelize = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const expenses = await Expense.findAll({
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId }
                    ]
                }, include: [
                    { model: Card, as: 'card' },
                ],
            });
            const total = await Expense.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId }
                    ]
                }
            });
    
            return res.json({ expenses, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading expenses' });
        }
    }
}