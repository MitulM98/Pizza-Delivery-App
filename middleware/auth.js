const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.cookies.token;
        console.log(token);
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch(err){
        res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css' });
    }
}

module.exports = auth;