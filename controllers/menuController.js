const foodModel = require('../model/foodSchema');
const userModel = require('../model/registSchema');
const transporter = require('../mail/mail');

const menuList = async (req, res) => {
    const foodItem = await foodModel.find();
    res.render('menulist', { item: foodItem, title: 'Menu List', nav: 'menunav.css', style: 'menulist.css' });
}

const addFood = (req, res) => {
    res.render('addFood', { title: 'Add Food', nav: 'menunav.css' });
}

const insertFood = (req, res) => {
    let { fname, fprice } = req.body;
    const img = req.file.filename;
    foodModel.create({
        foodName: fname,
        foodPrice: fprice,
        foodImg: img
    }).then(data => {
        console.log('data added');
        res.render('addFood', { title: 'Add Food', nav: 'menunav.css' });
    }).catch(err => {
        console.log('data not added');
        res.render('addFood', { title: 'Add Food', nav: 'menunav.css' });
    })
}

const addCart = async (req, res) => {
    const id = req.params.id;
    if (id === ':id') {
        res.render('cart', { flag: true, title: 'Shopping Cart', nav: 'menunav.css' })
    }
    else {
        session = req.session;
        session.foodID = id;
        const item = await foodModel.findOne({ _id: id });
        res.render('cart', { data: item, title: 'Shopping Cart', nav: 'menunav.css' });
    }
}

const deleteCart = (req, res) => {
    res.render('cart', { flag: true, title: 'Shopping Cart', nav: 'menunav.css' });
}

const checkout = (req, res) => {
    res.render('checkoutPage', {title: 'Checkout', nav: 'menunav.css' });
}

const creditAction = async (req, res) => {
    const creditNum = req.body.creditNum;
    const id = req.session.foodID;
    const personData = await userModel.findOne({email : req.session.email});
    const foodProduct = await foodModel.findOne({_id : id});
    try{
        let mailOption = {
            from : 'beastfake8@gmail.com',
            to : req.session.email,
            subject : 'Your Pizza order from Just Pizza',
            template : 'main',
            context : {
                name : personData.name,
                location : personData.location,
                address : personData.address,
                phone : personData.phone,
                foodID : foodProduct._id,
                foodName : foodProduct.foodName,
                foodPrice : foodProduct.foodPrice
            }
        }
        // implement from here.........
    }
    catch(err){
        console.log(err);
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.render('home', { nav: 'nav.css', style: 'home.css', title: 'Pizza App' });
}

module.exports = { menuList, addFood, insertFood, addCart, deleteCart, checkout, creditAction, logout }