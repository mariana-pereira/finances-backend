const mailer = require('@sendgrid/mail');

mailer.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = mailer;