const { Budget } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const january = await Budget.sum('amount', { where: { month: 1, year: req.headers.year, user_id: req.userId } });
    
            const february = await Budget.sum('amount', { where: { month: 2, year: req.headers.year, user_id: req.userId } });
    
            const march = await Budget.sum('amount', { where: { month: 3, year: req.headers.year, user_id: req.userId } });
    
            const april = await Budget.sum('amount', { where: { month: 4, year: req.headers.year, user_id: req.userId } });
    
            const may = await Budget.sum('amount', { where: { month: 5, year: req.headers.year, user_id: req.userId } });
    
            const june = await Budget.sum('amount', { where: { month: 6, year: req.headers.year, user_id: req.userId } });
    
            const july = await Budget.sum('amount', { where: { month: 7, year: req.headers.year, user_id: req.userId } });
    
            const august = await Budget.sum('amount', { where: { month: 8, year: req.headers.year, user_id: req.userId } });
    
            const september = await Budget.sum('amount', { where: { month: 9, year: req.headers.year, user_id: req.userId } });
    
            const october = await Budget.sum('amount', { where: { month: 10, year: req.headers.year, user_id: req.userId } });
    
            const november = await Budget.sum('amount', { where: { month: 11, year: req.headers.year, user_id: req.userId } });
    
            const december = await Budget.sum('amount', { where: { month: 12, year: req.headers.year, user_id: req.userId } });
    
            return res.json({ january, february, march, april, may, june, july, august, september, october, november, december });
    
        } catch(err) {
            return res.status(400).send({ error: 'Error loading budgets' });
        }
    }

}