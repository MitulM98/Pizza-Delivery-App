const mod = require('../packages');
const nodemailer = mod.nodemailer;
const hbs = mod.hbs;

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "beastfake8@gmail.com",
        pass: "fffdczwtceefjocd"
    }
})

transporter.use('compile', hbs({
    viewEngine: 'nodemailer-express-handlebars',
    viewPath: 'views/emailTemplates/'
}))

module.exports = transporter;