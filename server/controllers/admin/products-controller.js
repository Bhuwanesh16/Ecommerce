const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);
        res.json({
            success: true,
            result,
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: 'Error uploading image',
        });
    }
};

const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        } = req.body;

        console.log(averageReview, "averageReview");

        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        });

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};


const fetchAllProduct = async (req, res) => {
    try {

        const listOfProducts = await Product.find({});

        res.status(200).json({
            success: true,
            data: listOfProducts,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        let findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price === ''? 0 : price || findProduct.price
        findProduct.salePrice = salePrice === '' ? 0: salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();

        res.status(200).json({
            success: true,
            data: findProduct,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
        });
    }
}

module.exports = { handleImageUpload, addProduct, fetchAllProduct, deleteProduct, updateProduct };