import cryptoRandomString from "crypto-random-string";
import multer from "multer";
import path from "path";

/*-------------------Image Upload vai Multer---------------------------*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const { fileCategory } = req.params;
  
    if (fileCategory) {
 
      const uploadPath = path.join('uploads', fileCategory.toLowerCase());
      cb(null, uploadPath);
    } else {
      cb(null, "uploads");
    }
  },
  filename: function (req, file, cb) {
    

    cb(null, cryptoRandomString({ length: 10, type: 'alphanumeric' }) + path.extname(file.originalname));
  },
});

const fileExtensionFilter = (req, file, cb) => {

  if (file.mimetype === "application/pdf" || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error("Only PDF .jpg .png .jpeg .webp files are allowed!"), false);
  }
};


const imgUpload = multer({
  storage: storage,
  fileFilter: fileExtensionFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB file size limit
  },
});

export const uploadFile = imgUpload.fields([
  { name: "videoThumbnail", maxCount: 10 },
 
  // { name: "profile", maxCount: 1 },
]);

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./uploads",
//     filename: async (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null,file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//       );
//     },
//   }),
// });

// const imgExtansionFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//         cb(null, true)
//     }
//     else {
//         return cb(new Error('Only two formate .png, .jpeg allowed'));
//     }
// }

// const imgUpload = multer({
//     upload: upload,
//     limits: {
//         fileSize: 1024 * 1024 * 5 //5Mb
//     },
//     fileFilter: imgExtansionFilter
// });

// export default { imgUpload};
