import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  getCoursesByInstructorId,
} from "../../controllers/instructor-controller/course-controller.js";

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);

//added by myself
router.get("/get/courses-by-instructor-id/:id", getCoursesByInstructorId);

export const instructorCourseRoutes = router;
