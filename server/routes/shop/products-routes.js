const express = require('express');

const { getFilteredProducts } = require('../../controllers/shop/products-controller');



const router = express.Router();


router.get('/fetch', getFilteredProducts);
module.exports = router;