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


// const uploadMediaToCloudinary = async (buffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { resource_type: "auto" },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary Upload Error:", error);
//           return reject(new Error(error.message || "Error uploading media to Cloudinary"));
//         }
//         resolve(result);
//       }
//     );
    

//     if (!buffer) {
//       return reject(new Error("File buffer is empty"));
//     }

//     uploadStream.end(buffer); // ✅ Ensure we send the buffer
//   });
// };



// const deleteMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     throw new Error("Error deleting media from cloudinary");
//   }
// };

// export { uploadMediaToCloudinary, deleteMediaFromCloudinary };

const uploadMediaToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(new Error(error.message || "Error uploading media to Cloudinary"));
        }

        // ✅ Always return secure_url (HTTPS)
        if (result && result.secure_url) {
          resolve({
            ...result,
            url: result.secure_url, // Ensure HTTPS URL is returned
          });
        } else {
          reject(new Error("Failed to retrieve secure URL from Cloudinary"));
        }
      }
    );

    if (!buffer) {
      return reject(new Error("File buffer is empty"));
    }

    uploadStream.end(buffer);
  });
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Error deleting media from Cloudinary");
  }
};

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };