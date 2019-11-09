const bcrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        res.json({
            user,
            token: user.generateToken()
        });
    }
}