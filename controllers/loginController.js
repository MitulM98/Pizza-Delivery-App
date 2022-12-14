const userModel = require('../model/registSchema');
const mod = require('../packages');
const bcrypt = mod.bcrypt;

const loginPage = (req, res) => {
    res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css' });
}

const login = async (req, res) => {
    let { email, pass } = req.body;
    await userModel.findOne({ email: email })
        .then(data => {
            if (bcrypt.compareSync(pass, data.pass)) {
                session = req.session;
                session.email = email;
                res.redirect('/menu/list');
            }
            else {
                res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css', flag: true })
            }
        }).catch(err => {
            res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css', flag: true })
        })
}

module.exports = {loginPage, login}