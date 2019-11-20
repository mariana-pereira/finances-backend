const { Investment, Account, Target } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const investment = await Investment.create({ ...req.body, account_id: req.headers.account_id, user_id: req.userId });
            return res.json(investment);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error creating investment' });
    
        }
    },

    async show(req, res) {
        try {
            const investment = await Investment.findByPk(req.params.id, {
                include: [
                    { model: Account, as: 'account' },
                    { model: Target, as: 'target' },
                ]
            });
    
            return res.json(investment);
    
        } catch(err) {
            return res.status(400).send({ error: 'Error loading investment' });
        }
    },

    async index(req, res) {
        try {
            const investments = await Investment.findAll({ 
                where: { user_id: req.userId },
                include: [
                    { model: Account, as: 'account' },
                    { model: Target, as: 'target' },
                ]
            });
            const total = await Investment.sum('total_amount', { where: { user_id: req.userId } });
    
            return res.json({ investments, total });
    
        } catch(err) {
            return res.status(400).send({ error: 'Error loading investments' });
        }
    },

    async update(req, res) {
        try {

            const { name, type, tax, application_date, redeem_date, application_amount } = req.body;
    
            await Investment.update({
                name, 
                type,
                tax,
                application_date,
                redeem_date,
                application_amount
            } , {
                where: {
                    id: req.params.id
                }
            });
    
            return res.status(200).send({ message: 'Investment sucessfuly updated'});
    
        } catch (err) {
            return res.status(400).send({ error: 'Error updating investment' });
        }
    },

    async destroy(req, res) {
        try {
            await Investment.destroy({
                where: {
                  id: req.params.id
                }
              });
    
              return res.status(200).send({ message: 'Investment sucessfuly deleted' });
    
        } catch(err) {
            return res.status(400).send({ error: 'Error deleting investment' });
        }
    }
}