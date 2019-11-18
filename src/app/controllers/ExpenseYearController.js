const { Expense, Card } = require('../models');
const sequelize = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const expenses = await Expense.findAll({
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId
                }, include: [
                    { model: Card, as: 'card' },
                ],
            });
            const total = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId
                }
            });
    
            return res.json({ expenses, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading expenses' });
        }
    }
}