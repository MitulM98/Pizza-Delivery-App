const userModel = require('../model/registSchema');
const mod = require('../packages');
const bcrypt = mod.bcrypt;
const saltRounds = 10;

const registPage = (req, res) => {
    res.render('regist', {title : 'Sign Up', nav : 'nav.css'});
}

const insertData = (req, res) => {
    let {name, email, pass, phone, location, address} = req.body;
    const hash = bcrypt.hashSync(pass, saltRounds);
    userModel.create({
        name : name,
        email : email,
        pass : hash,
        phone : phone,
        location : location,
        address : address
    }).then(data => {
        res.render('login', {style : 'login.css', title : 'Login', nav : 'nav.css'});
    }).catch(err => {
        res.render('regist', {title : 'Sign Up', nav : 'nav.css', flag : true});
    })
}

module.exports = {registPage, insertData}