import { StudentCourses } from "../../models/StudentCourses.js";

export const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    res.status(200).json({
      success: true,
      message: "Courses Found",
      data: studentBoughtCourses?.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some Error While Getting Student Courses",
    });
  }
};
