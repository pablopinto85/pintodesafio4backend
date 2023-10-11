import express from "express";
import multer from "multer";
import __dirname from "../utils.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `${__dirname}/public/files`),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: "error", error: "No se pudo guardar la imagen" });
  }

  let prod = req.body;
  prod.profile = req.file.path;

  res.json({ status: "success", message: "Imagen Guardada" });
});

export { router };



