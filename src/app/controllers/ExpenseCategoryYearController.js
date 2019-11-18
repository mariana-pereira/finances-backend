const { Expense } = require('../models');
const sequelize = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const food = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Alimentação'
                }
            });
    
            const subscription = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Assinaturas'
                }
            });
    
            const beauty = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Beleza'
                }
            });
    
            const bill = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Contas'
                }
            });
    
            const sport = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Esporte'
                }
            });
    
            const recreation = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Lazer'
                }
            });
    
            const pet = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Pet'
                }
            });
    
            const health = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Saúde'
                }
            });
    
            const tech = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Tech'
                }
            });
    
            const transportation = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Transporte'
                }
            });

            const clothing = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Vestuário'
                }
            });
    
            const other = await Expense.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    category: 'Outros'
                }
            });
    
            return res.send({ food, subscription, beauty, bill, sport, recreation, pet, health, tech, transportation, clothing, other });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading expenses' });
        }
    }
}