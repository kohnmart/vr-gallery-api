import multer from 'multer';
import path from 'path';

//Storage
const storage = multer.diskStorage({
    destination: './store/',
    filename: function (req, file, cb) 
    {
        cb(null, file.filename + path.extname(file.originalname));
    }
});

// Init 
const upload = multer({ storage: storage });

export default upload;