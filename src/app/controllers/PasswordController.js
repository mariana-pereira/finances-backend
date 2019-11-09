const crypto = require('crypto');

const mailer = require('../../modules/mailer');

const { User } = require('../models');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(3).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.update({ password_reset_token: token, password_reset_expires: now }, {
                where: {
                    id: user.id
                }
            });

            const msg = {
                to: email,
                from: process.env.SENDGRID_EMAIL,
                subject: 'Recuperação de senha',
                text: 'Você esqueceu a sua senha? Não tem problema, utilize esse token:',
                html: `<p>Você esqueceu a sua senha? Não tem problema, utilize esse token: ${token} </p>`,
            };

            mailer.send(msg, err => {
                if (err) {
                    return res.status(400).send({ error: 'Cannot send forgot password email' });
                }

                res.send();
            })


        } catch (err) {
            res.status(400).send({ error: 'Error on forgot password, try again' });
        }
    }
}