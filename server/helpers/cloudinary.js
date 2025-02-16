import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
//configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

// const uploadMediaToCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//     });

//     return result;
//   } catch (error) {
//     throw new Error("Error uploading media to cloudinary");
//   }
// };

const uploadMediaToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(new Error(error.message || "Error uploading media to Cloudinary"));
        }
        resolve(result);
      }
    );

    if (!buffer) {
      return reject(new Error("File buffer is empty"));
    }

    uploadStream.end(buffer); // ✅ Ensure we send the buffer
  });
};



const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Error deleting media from cloudinary");
  }
};

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };
