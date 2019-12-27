// index, show, store, update, destroy
const { Card } = require('../models');

module.exports = {
    async store(req, res) {
        try {
            const card = await Card.create({ ...req.body, user_id: req.userId });
            return res.json(card);
    
        } catch (err) {
            return res.status(400).send({ error: 'Error creating card' });
            
        }
    },

    async show(req, res) {
        try {
            const card = await Card.findByPk(req.params.id);
    
            return res.json(card);
    
        } catch(err) {
            return res.status(400).send({ error: 'Error loading card' });
        }
    },

    async index(req, res) {
        try {
            const cards = await Card.findAll({ where: { user_id: req.userId } });

            return res.json(cards);

        } catch (err) {
            return res.status(400).send({ error: 'Error loading cards' });
        }
    },

    async update(req, res) {
        try {

            const { name, total_limit, available_limit, expiry_date } = req.body;
    
            
            await Card.update({
                name, 
                total_limit, 
                available_limit,
                expiry_date,
            } , {
                where: {
                    id: req.params.id
                }
            });
    
            return res.status(200).send({ message: 'Card sucessfuly updated'});
    
        } catch (err) {
            return res.status(400).send({ error: 'Error updating card' });
        }
    },

    async destroy(req, res) {
        try {
            await Card.destroy({
                where: {
                  id: req.params.id
                }
              });
    
              return res.status(200).send({ message: 'Card sucessfuly deleted' });
    
        } catch(err) {
            return res.status(400).send({ error: 'Error deleting card' });
        }
    }
}