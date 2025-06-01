const { ImageUploadUtil } = require("../../helpers/cloudinary");



const handleImageUpload=async(req,res)=>{
    try{
        const b64=Buffer.from(req.file.buffer).toString('base64');
        const url="data:"+req.file.mimetype+";base64,"+b64;
        const result= await ImageUploadUtil(url);
        res.json({
            success:true,
            result,
        })
    }
    catch(e)
    {
        console.log(e);
        res.json({
            success:false,
            message:'Error uploading image',
        });
    }
};

module.exports={
    handleImageUpload
};