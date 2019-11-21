const { Movimentation, Account, Company } = require('../models');
const sequelize = require('sequelize');
const { Op } = Sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const movimentations = await Movimentation.findAll({
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId }
                    ]
                }, include: [
                    { model: Account, as: 'account' },
                    { model: Company, as: 'company' },
                ],
            });
            const total = await Movimentation.sum('amount', {
                where: {
                    [Op.and]: [
                        { date: sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.headers.month) },
                        { date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year) },
                        { user_id: req.userId }
                    ]
                }
            });

            return res.json({ movimentations, total });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    }
}