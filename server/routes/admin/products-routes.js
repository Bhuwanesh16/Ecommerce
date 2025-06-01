const express = require('express');

const { handleImageUpload } = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/image-upload', upload.single('image'), handleImageUpload);

module.exports = router;