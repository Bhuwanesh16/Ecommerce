const express = require('express');

const { handleImageUpload,addProduct,fetchAllProduct,updateProduct,deleteProduct } = require('../../controllers/admin/products-controller');
const { authMiddleware, adminMiddleware } = require('../../controllers/auth/auth-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/image-upload', authMiddleware, adminMiddleware, upload.single('my_file'), handleImageUpload);
router.post('/add', authMiddleware, adminMiddleware, addProduct);
router.get('/fetch', authMiddleware, adminMiddleware, fetchAllProduct);
router.put('/update/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router; 