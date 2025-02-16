import express from "express";
import multer from "multer";
import {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} from "../../helpers/cloudinary.js";

const router = express.Router();

// const upload = multer({ dest: "uploads/" });
const storage = multer.memoryStorage();
// const upload = multer({ storage });

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB limit
});


router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await uploadMediaToCloudinary(req.file.buffer); // Use buffer
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});



router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Asset id is required" });
    }

    await deleteMediaFromCloudinary(id);
    res
      .status(200)
      .json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
//   try {
//     const uploadPromises = req.files.map((fileItem) =>
//       uploadMediaToCloudinary(fileItem.path)
//     );

//     const results = await Promise.all(uploadPromises);

//     res.status(200).json({
//       success: true,
//       data: results,
//     });
//   } catch (event) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error in bulk uploading files" });
//   }
// });


router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) => uploadMediaToCloudinary(file.buffer));

    const results = await Promise.all(uploadPromises);

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export const mediaRoutes = router;
