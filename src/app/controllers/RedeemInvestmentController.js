const { Investment, Account, Target, Movimentation } = require('../models');

module.exports = {
    async destroy(req, res) {
        try {

            const investment = await Investment.findByPk(req.params.id);

            await Investment.destroy({
                where: {
                    id: req.params.id
                }
            });

            await Movimentation.create({
                date: new Date(),
                user_id: req.userId,
                account_id: req.headers.account_id,
                amount: investment.total_amount,
                type: 'Crédito',
                category: 'Resgate de investimento'
            });

            const investment_target = await Investment.sum('total_amount', { where: { target_id: req.headers.target_id } });

            await Target.update({
                actual_amount: investment_target,
            }, {
                where: {
                    id: req.headers.target_id
                }
            });

            const investment_account = await Investment.sum('total_amount', { where: { account_id: req.headers.account_id } });
            const movimentation_account = await Movimentation.sum('amount', {where: { account_id: req.headers.account_id } });

            await Account.update({
                account_balance: movimentation_account,
                investments_balance: investment_account
            } , {
                where: {
                    id: req.headers.account_id
                }
            });

            return res.status(200).send({ message: 'Investment successfully redeemed' });

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting investment' });
        }
    }
}