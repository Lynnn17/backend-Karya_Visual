const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const fileTypes = {
    image: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/svg+xml",
      "image/jpg",
    ],
    video: ["video/mp4", "video/avi", "video/mkv"],
    document: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  };

  if (fileTypes.image.includes(file.mimetype)) {
    req.uploadType = "image";
    cb(null, true);
  } else if (fileTypes.video.includes(file.mimetype)) {
    req.uploadType = "video";
    cb(null, true);
  } else if (fileTypes.document.includes(file.mimetype)) {
    req.uploadType = "document";
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, "../uploads/");

    // Tentukan folder berdasarkan uploadType
    switch (req.uploadType) {
      case "image":
        folder = path.join(folder, "images");
        break;
      case "video":
        folder = path.join(folder, "videos");
        break;
      case "document":
        folder = path.join(folder, "documents");
        break;
      default:
        return cb(new Error("Invalid upload type"));
    }
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const limits = {
  fileSize: (req, file, cb) => {
    let sizeLimit;

    switch (req.uploadType) {
      case "image":
        sizeLimit = 5 * 1024 * 1024;
        break;
      case "video":
        sizeLimit = 10 * 1024 * 1024;
        break;
      case "document":
        sizeLimit = 5 * 1024 * 1024;
        break;
      default:
        sizeLimit = 0;
    }

    cb(null, sizeLimit);
  },
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
