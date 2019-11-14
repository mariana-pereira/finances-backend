const { Target } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const target = await Target.create({ ...req.body, user_id: req.userId });
            return res.json(target);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error creating target' });
    
        }
    },

    async show(req, res) {
        try {
            const target = await Target.findByPk(req.params.id);
    
            return res.json(target);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading target' });
        }
    },

    async index(req, res) {
        try {
            const targets = await Target.findAll({ where: { user_id: req.userId } });
    
            return res.json(targets);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error loading targets' });
        }
    },

    async update(req, res) {
        try {

            const { name, necessary_amount, deadline } = req.body;
    
            await Target.update({
                name,
                necessary_amount,
                deadline,
            }, {
                    where: {
                        id: req.params.id
                    }
                });
    
            return res.status(200).send({ message: 'Target sucessfuly updated' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error updating target' });
        }
    },

    async destroy(req, res) {
        try {
            await Target.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            return res.status(200).send({ message: 'Target sucessfuly deleted' });
    
        } catch (err) {
            return res.status(400).send({ error: 'Error deleting target' });
        }
    }
}