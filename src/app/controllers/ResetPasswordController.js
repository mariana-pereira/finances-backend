const { User } = require('../models');

module.exports = {
    async store(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } })

            if (!user)
                return res.status(400).send({ error: 'User not find' });

            if (token !== user.password_reset_token)
                return res.status(400).send({ error: 'Invalid token' });

            const now = Date();

            if (now > user.password_reset_expires)
                return res.status(400).send({ error: 'Expired token, generate a new one' });

            user.password = password;

            await user.save();

            res.send();

        } catch (err) {
            res.status(400).send({ error: 'Cannot reset password' });
        }
    }
}