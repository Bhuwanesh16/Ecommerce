const cloudinary=require('cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'du94sgiyd',
    api_key:'744665367869475',
    api_secret: 'FyIicXGXnlhjkzpKXprOU9WAypA',
});

const storage = multer.memoryStorage();

async function ImageUploadUtil(file)
{
    const result=await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    });
    return result;
}

const upload= multer({storage});

module.exports={upload,ImageUploadUtil};