import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let prefix = file.fieldname;
    if (file.fieldname === "coverImage") prefix = "cover";
    if (file.fieldname === "flatImages") prefix = "flat_images";
    if (file.fieldname === "amenityImages") prefix = "amenities";
    if (file.fieldname === "floorPlans") prefix = "floor_plan";
    
    cb(null, prefix + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (.jpeg, .jpg, .png, .webp) are allowed"));
    }
  }
});

/**
 * Multi-field upload for project media:
 * - "images"        → gallery photos (IMAGE)
 * - "coverImage"    → project cover photo (IMAGE, isCover: true)
 * - "brochure"      → PDF brochure (BROCHURE)
 * - "floorPlans"    → floor plan images (FLOOR_PLAN)
 * - "flatImages"    → rooms / flat interior photos (IMAGE)
 * - "amenityImages" → amenities photos (IMAGE)
 */
export const uploadProjectMedia = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const isImage = /jpeg|jpg|png|webp|svg|gif|heic|heif|jfif/.test(path.extname(file.originalname).toLowerCase());
    const isPdf = /pdf/.test(path.extname(file.originalname).toLowerCase());
    const mimetypeImg = /jpeg|jpg|png|webp|svg\+xml|gif|heic|heif|jfif/.test(file.mimetype);
    const mimetypePdf = /pdf/.test(file.mimetype);

    if ((mimetypeImg && isImage) || (mimetypePdf && isPdf)) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (.jpeg, .jpg, .png, .webp, .svg, .gif, .heic) and PDF are allowed"));
    }
  }
}).fields([
  { name: "images",        maxCount: 20 },
  { name: "coverImage",    maxCount: 1 },
  { name: "brochure",      maxCount: 1 },
  { name: "floorPlans",    maxCount: 10 },
  { name: "flatImages",    maxCount: 20 },
  { name: "amenityImages", maxCount: 20 },
  { name: "reraQrCode",    maxCount: 1 },
]);
