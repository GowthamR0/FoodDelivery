import express from 'express';
require("dotenv").config();

//multer
import multer from 'multer';

import { s3Upload } from '../../Utils/Aws/s3';

const Router = express.Router();
Router.use(express.json());

/*
Route:/
Descript:store the image in s3 bucket
Params:none
Access:public
Method:post
*/

//multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage});


/*
Route            /
Des              Uploading given image to S3 bucket , and then saving the file to mongodb
Params           None
Access           Public
Method           POST
*/

Router.post("/", upload.single("file") ,async(req,res)=> {
    try {
   const file = req.file;
   
   //S3 bucket options
   const bucketOptions = {
     Bucket: "mkfoods",
     Key: file.originalname,
     Body: file.buffer,
     ContentType: file.mimetype,
     ACL: "public-read"
   };
  
  
   const uploadImage = await s3Upload(bucketOptions);
  
   return res.status(200).json({ uploadImage });
  
    } catch (error) {
  return res.status(500).json({error: error.message});
    }
  });
  

export default Router;