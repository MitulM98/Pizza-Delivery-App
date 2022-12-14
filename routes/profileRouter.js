const mod = require('../packages');
const router = mod.express.Router();
const {mainProfile, updateProfile, updateData, resetPass, changePass} = require('../controllers/profileController');

router.get('/', mainProfile);
router.get('/editProfile/:id', updateProfile);
router.post('/update-data', updateData);
router.get('/resetpasspage', resetPass);
router.post('/resetpass-action', changePass);

module.exports = router;