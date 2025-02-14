import InstructorCourses from "../../components/instructor-view/courses/index";
import InstructorDashboard from "../../components/instructor-view/dashboard/index";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent } from "../../components/ui/tabs";

import { AuthContext } from "../../context/auth-context/index";
import { instructorContext } from "../../context/instructor-context/index";
import {
  fetchInstructorCourseListService,
  fetchCoursesByInstructorIdService,
} from "../../services/index.js";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { LuLinkedin } from "react-icons/lu";
import { PiInstagramLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(instructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) {
      setInstructorCoursesList(response?.data);
    }
    console.log(response?.data, "response?.data");
  }
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const { auth } = useContext(AuthContext);
  console.log(auth?.user?._id, "auth?.user?._id");

  //added by myself
  const [coursesByInstructorId, setCoursesByInstructorId] = useState([]);
  const [instructorName, setInstructorName] = useState("");

  async function fetchCoursesByInstructorId() {
    const response = await fetchCoursesByInstructorIdService(auth?.user?._id);
    if (response?.success) {
      setCoursesByInstructorId(response?.data);
      setInstructorName(response?.data[0]?.instructorName);
    }
    console.log(response?.data, "response?.data2");
    console.log(instructorName, "instructorName");
  }

  useEffect(() => {
    fetchCoursesByInstructorId();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: (
        <InstructorDashboard
          listOfCourses={instructorCoursesList}
          coursesByInstructorId={coursesByInstructorId}
        />
      ),
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: (
        <InstructorCourses
          listOfCourses={instructorCoursesList}
          coursesByInstructorId={coursesByInstructorId}
        />
      ),
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white  shadow-sm hidden md:block">
        <div className="p-4">
          <img src="/src/assets/bbLogo.svg" alt="logo" className="mb-8 w-36 " />
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className={`w-full justify-start mb-4 ${
                  activeTab === menuItem.value
                    ? "bg-orange-500 hover:bg-orange-500 hover:scale-105 transition-all hover:shadow-white  text-white"
                    : "bg-white  hover:bg-white hover:scale-105 transition-all hover:text-orange-500 hover:text-md text-black"
                }`}
                key={menuItem.value}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8"> Welcome {instructorName}</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex mt-10 w-full fixed right-[-2%] bottom-5 flex-col  items-center">
          <div className="flex items-center justify-center">
            <img
              src="./src/assets/bb.svg"
              alt="logo"
              className="w-3 md:w-5 mt-2 animate-pulse"
            />
          </div>
          <p className="text-xs text-center opacity-60 mt-2 p-2">
            © Bhupesh Roushan 2025. All Rights Reserved @ BuildingBlocks
          </p>

          <div className="flex flex-row gap-2 mt-2">
            <Link to={"https://www.instagram.com/roushanwa"} target="_blank">
              <PiInstagramLogoFill className=" hover:scale-120 hover:text-red-600 hover:opacity-100 transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to={"https://www.linkedin.com/in/roushanb"} target="_blank">
              <FaGithub className=" hover:scale-120 hover:text-black hover:opacity-100  transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to={"https://github.com/bhupesh-roushan"} target="_blank">
              <LuLinkedin className=" hover:scale-120 hover:text-blue-700 hover:opacity-100 transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to={"https://bhupeshroushan.vercel.app"} target="_blank">
              <FaGlobe className=" hover:scale-120 hover:text-orange-600 hover:opacity-100 transition-all w-3 md:w-4 opacity-70" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
