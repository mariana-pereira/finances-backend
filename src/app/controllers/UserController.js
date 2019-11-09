// index, show, store, update, destroy
const { User } = require('../models');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        try {

            if (await User.findOne({ where: { email } }))
                return res.status(400).send({ error: "User already exists" });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.json({
                user,
                token: user.generateToken()
            })

        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },

    async show (req, res) {
        try {
            const user = await User.findByPk(req.userId);
            return res.json({ user });
    
        } catch(err) {
            return res.status(400).send({ error: 'Error loading user' });
        }
    }
}