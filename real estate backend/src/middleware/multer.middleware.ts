import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import path from "path";

/**
 * DRY helper — builds a CloudinaryStorage instance for a given folder.
 * `resourceType` defaults to "image"; use "raw" for PDFs.
 */
function makeCloudinaryStorage(folder: string, resourceType: "image" | "raw" | "auto" = "image") {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: resourceType,
      // Let Cloudinary auto-detect the format (WebP/AVIF delivery via URL)
      format: async (_req: any, file: Express.Multer.File) => {
        const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
        if (resourceType === "raw") return ext; // keep original for PDFs
        // Always store as webp for images (Cloudinary converts on the fly)
        return "webp";
      },
    } as any,
  });
}

// ── Single-file upload (blog cover image) ────────────────────────────────────
export const upload = multer({
  storage: makeCloudinaryStorage("real-estate/blog"),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const valid = /jpeg|jpg|png|webp|gif/.test(
      path.extname(file.originalname).toLowerCase().replace(".", "")
    );
    valid ? cb(null, true) : cb(new Error("Only images are allowed"));
  },
});

// ── Multi-field project media upload ─────────────────────────────────────────
// Each field gets its own Cloudinary folder for clean organisation.
const projectMediaStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req: any, file: Express.Multer.File) => {
    // Map field name → Cloudinary sub-folder
    const folderMap: Record<string, string> = {
      coverImage:    "real-estate/projects/covers",
      images:        "real-estate/projects/gallery",
      flatImages:    "real-estate/projects/flats",
      amenityImages: "real-estate/projects/amenities",
      floorPlans:    "real-estate/projects/floor-plans",
      reraQrCode:    "real-estate/projects/rera",
    };

    const folder = folderMap[file.fieldname] ?? "real-estate/projects/misc";
    const isPdf  = /pdf/.test(path.extname(file.originalname).toLowerCase().replace(".", ""));

    return {
      folder,
      resource_type: isPdf ? "raw" : "image",
      // Store images as webp; keep PDFs as-is
      format: isPdf ? undefined : "webp",
    };
  },
});

export const uploadProjectMedia = multer({
  storage: projectMediaStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    const validImg = /jpeg|jpg|png|webp|svg|gif|heic|heif|jfif/.test(ext);
    const validPdf = /pdf/.test(ext);
    (validImg || validPdf)
      ? cb(null, true)
      : cb(new Error("Only images (.jpeg .jpg .png .webp .svg .gif .heic) and PDF are allowed"));
  },
}).fields([
  { name: "images",        maxCount: 20 },
  { name: "coverImage",    maxCount: 1 },
  { name: "brochure",      maxCount: 1 },
  { name: "floorPlans",    maxCount: 10 },
  { name: "flatImages",    maxCount: 20 },
  { name: "amenityImages", maxCount: 20 },
  { name: "reraQrCode",    maxCount: 1 },
]);
