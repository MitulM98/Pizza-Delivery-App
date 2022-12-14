const mod = require('../packages');
const router = mod.express.Router();
const {loginPage, login} = require('../controllers/loginController');

router.get('/', loginPage);
router.post('/logdata', login);

module.exports = router;