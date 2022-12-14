const mod = require('../packages');
const router = mod.express.Router();
const {registPage, insertData} = require('../controllers/registController');

router.get('/', registPage);
router.post('/regdata', insertData);

module.exports = router;