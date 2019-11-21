const { Movimentation, Account, Company } = require('../models');

module.exports = {
    
    async show(req, res) {
        try {
            const movimentation = await Movimentation.findByPk(req.params.id);
    
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
    
            return res.status(200).send({ message: 'Movimentation sucessfuly deleted' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error deleting movimentation' });
        }
    }
}