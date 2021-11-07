// tests (à retirer)
console.log(` --------> sauce-route`);

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceController = require('../controllers/sauce');

router.get('/', auth, sauceController.getAllSauces);
router.post('/', auth, multer, sauceController.createSauce);//multer ici
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);//multer ici
router.delete('/:id', auth, sauceController.deleteSauce);

module.exports = router;