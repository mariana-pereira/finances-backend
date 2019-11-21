const { Movimentation, Company } = require('../models');
const sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const company = await Company.findByPk(req.headers.company_id);
    
            const total = await Movimentation.sum('amount', {
                where: {
                    date: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.headers.year),
                    user_id: req.userId,
                    company_id: req.headers.company_id
                }
            });
    
            return res.json({ company, total });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading movimentations' });
        }
    }
}