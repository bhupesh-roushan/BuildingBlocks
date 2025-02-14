import { Course } from "../../models/Course.js";

//for adding new course

export const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course Added Successfully",
        data: saveCourse,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while adding new course",
    });
  }
};

//for getting all the courses

export const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find();
    res.status(200).json({
      success: true,
      message: "Courses Retrieved Successfully",
      data: coursesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while adding new course",
    });
  }
};

//added by myself
//for getiing the courses by instructor id

export const getCoursesByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const coursesList = await Course.find({ instructorId: id });
    res.status(200).json({
      success: true,
      message: "Courses Retrieved Successfully",
      data: coursesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while fetching courses",
    });
  }
};

// for getting the course details by id

export const getCourseDetailsByID = async (req, res) => {
  try {
    const {id} = req.params;
    const courseDeatils = await Course.findById(id);

    if (!courseDeatils) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course Details Retrieved Successfully",
      data: courseDeatils,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while adding new course",
    });
  }
};

//for updating the course by id

export const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
      //new: true is used to return the updated document in the response
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while adding new course",
    });
  }
};
