import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

//Storage config
const storage = multer.diskStorage({
  destination: './store',
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

// Create multer instance middleware
const upload = multer({ storage: storage });

export default upload;
