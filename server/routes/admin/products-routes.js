const express = require('express');

const { handleImageUpload,addProduct,fetchAllProduct,updateProduct,deleteProduct } = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/image-upload', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.get('/fetch', fetchAllProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;