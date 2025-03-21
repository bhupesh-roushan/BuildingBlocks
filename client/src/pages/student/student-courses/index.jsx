import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { AuthContext } from "../../../context/auth-context/index";
import { StudentContext } from "../../../context/student-context/index";
import { fetchStudentBoughtCoursesService } from "../../../services/index.js";
import { Play } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { studentBoughtCourseList, setStudentBoughtCourseList } =
    useContext(StudentContext);

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCourseList(response?.data);
    }
  }

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);
  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold mb-8">My Courses List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCourseList && studentBoughtCourseList?.length > 0 ? (
          studentBoughtCourseList?.map((course) => (
            <Card key={course.courseId} className=" flex flex-col ">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className=" w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold text-md sm:text-lg mb-1">
                  {course?.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1 bg-white text-black hover:scale-105 transition-all shadow-sm shadow-green-200 hover:bg-white cursor-pointer"
                >
                  <Play className="mr-2 h-4 w-4 text-green-500" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses Found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;
