import dotenv from 'dotenv';
import cloudinaryModule from 'cloudinary';

dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  export default cloudinary;