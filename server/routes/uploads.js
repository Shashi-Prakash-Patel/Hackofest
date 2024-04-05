import multer from "multer";
import { Path } from "mongoose";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
