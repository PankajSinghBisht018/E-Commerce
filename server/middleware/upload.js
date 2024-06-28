import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'drngufzyf',
  api_key: 177673222237759,
  api_secret:'64dTbslFtNTgnK7u6fxRSJjFy9Y',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: '', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `user_${req.user._id}_${Date.now()}_${file.originalname}`, 
  },
});

const upload = multer({ storage });

export default upload;
