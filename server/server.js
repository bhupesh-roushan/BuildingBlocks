import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;
const MONGODB_URI = process.env.MONGODB_URI;

//routes import
import { authRoutes } from "./routes/auth-routes/index.js";
import { mediaRoutes } from "./routes/instructor-routes/media-routes.js";
import { instructorCourseRoutes } from "./routes/instructor-routes/course-routes.js";
import { studentViewCourseRoutes } from "./routes/student-routes/course-routes.js";
import { studentViewOrderRoutes } from "./routes/student-routes/order-routes.js";
import { studentCoursesRoutes } from "./routes/student-routes/student-courses-routes.js";

import { studentCourseProgressRoutes } from "./routes/student-routes/course-progress-routes.js";

//middleware configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
)
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);

//error handling middleware
app.use((err, req, res, next) => {

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

//server configuration
app.listen(PORT, () => {
  console.log(`Server is now running on Port ${PORT}`);
});
