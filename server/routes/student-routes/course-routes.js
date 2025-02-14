import express from "express";

const router = express.Router();

import {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo
} from "../../controllers/student-controller/course-controller.js";

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);


export const studentViewCourseRoutes = router;