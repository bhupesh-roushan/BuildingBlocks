import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { instructorContext } from "@/context/instructor-context";

import { Edit, Users } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses, coursesByInstructorId}) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(instructorContext);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className=" flex justify-between flex-row gap-2 items-center text-md sm:text-lg md:text-2xl mb-8">
            <h1 className="flex flex-row gap-2">
              <Users className="text-orange-500" /> Your Courses
            </h1>
            <Button
              onClick={() => {
                setCurrentEditedCourseId(null);
                setCourseLandingFormData(courseLandingInitialFormData);
                setCourseCurriculumFormData(courseCurriculumInitialFormData);
                navigate("/instructor/create-new-course");
              }}
              className="p-3 bg-orange-500 hover:bg-orange-500 hover:scale-105 transition-all delay-0"
              size="sm"
            >
              Create New Course
            </Button>
          </CardTitle>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                      Course
                    </TableHead>
                    <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                      Students
                    </TableHead>
                    <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                      Revenue
                    </TableHead>
                    <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coursesByInstructorId && coursesByInstructorId.length > 0
                    ? coursesByInstructorId.map((course) => (
                        <TableRow key={course?._id}>
                          <TableCell className="font-medium">
                            {course?.title}
                          </TableCell>
                          <TableCell>{course?.students?.length}</TableCell>
                          <TableCell>
                            ₹ {course?.students?.length * course?.pricing}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => {
                                navigate(
                                  `/instructor/edit-course/${course?._id}`
                                );
                              }}
                              variant="ghost"
                              size="sm"
                            >
                              <Edit className="h-6 w-6" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default InstructorCourses;
