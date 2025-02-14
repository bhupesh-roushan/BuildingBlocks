import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "../../config/index.js";
import { createContext, useState } from "react";

export const instructorContext = createContext();

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);

  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);

  const [instructorCoursesList, setInstructorCoursesList] = useState([]);

  const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);

  const [currentInstructorCoursesById, setCurrentInstructorCoursesById] =
    useState({});

  return (
    <instructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage,
        instructorCoursesList,
        setInstructorCoursesList,
        currentEditedCourseId,
        setCurrentEditedCourseId,
        currentInstructorCoursesById,
        setCurrentInstructorCoursesById,
      }}
    >
      {children}
    </instructorContext.Provider>
  );
}
