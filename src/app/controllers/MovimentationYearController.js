const { Movimentation, Account, Company } = require('../models');
const sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const movimentations = await Movimentation.findAll({
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId
                }, include: [
                    { model: Account, as: 'account' },
                    { model: Company, as: 'company' },
                ]
            });
            const total = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId
                }
            });
    
            return res.json({ movimentations, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    }
}