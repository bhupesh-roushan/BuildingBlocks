import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IndianRupee, Users } from "lucide-react";

function InstructorDashboard({ listOfCourses, coursesByInstructorId}) {

  
  function calculateTotalStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } =
      coursesByInstructorId.reduce(
        (acc, course) => {
          const studentCount = course.students.length;
          acc.totalStudents += studentCount;
          acc.totalProfit += course.pricing * studentCount;
          course.students.forEach((student) => {
            acc.studentList.push({
              courseTitle: course.title,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });

          return acc;
        },
        {
          totalStudents: 0,
          totalProfit: 0,
          studentList: [],
        }
      );

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: `${calculateTotalStudentsAndProfit().totalStudents} Student`,
    },
    {
      icon: IndianRupee,
      label: "Total Revenue",
      value: `${calculateTotalStudentsAndProfit().totalProfit} ₹`,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className=" flex flex-row gap-2 items-center text-md sm:text-lg md:text-2xl">
            <Users className="text-orange-500" /> Students List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                    Course Name
                  </TableHead>
                  <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                    Student Name
                  </TableHead>
                  <TableHead className="text-orange-500 font-medium md:font-semibold text-xs sm:text-md md:text-lg">
                    Student Email
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculateTotalStudentsAndProfit().studentList.map(
                  (studentItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {studentItem.courseTitle}
                      </TableCell>
                      <TableCell>{studentItem.studentName}</TableCell>
                      <TableCell>{studentItem.studentEmail}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* //added by myself */}

      <Card></Card>
    </div>
  );
}

export default InstructorDashboard;
