import React, { useContext, useEffect } from "react";
import banner from "../../../assets/banner3.jpg";
import { courseCategories } from "../../../config/index.js";
import { Button } from "../../../components/ui/button";
import { StudentContext } from "../../../context/student-context/index";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "../../../services/index.js";
import { AuthContext } from "../../../context/auth-context/index";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../../../config/companies.json";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
    }
    console.log(response?.data);
  }

  // for navigating to the course details page
  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);
  return (
    <div className="min-h-screen bg-white ">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8npx-4 lg:px-8">
        <div className=" lg:w-[60%] lg:pr-12">
          <h1 className="md:text-4xl lg:text-5xl text-3xl mt-5 font-medium mb-4">
            Building Knowledge Block By Block
          </h1>
          <p className="text-md md:text-xl">From Basics to Brilliance</p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0 p-2">
          <img
            src={banner}
            width={600}
            height={400}
            alt="banner"
            className="w-full h-auto rounded-sm shadow-lg  mt-5"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100 mt-5 mb-5">
        <h2 className="text-md  sm:text-lg md:text-xl font-bold mb-6">
          {" "}
          Course Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {courseCategories.map((categoryItem) => (
            <Button
              variant="outline"
              className="justify-center text-xs sm:text-sm"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      {/* //for carousel component */}

      <section className="bg-black p-2">
        <h2 className="text-white text-center text-lg sm:text-xl font-bold my-2">
          Builded the Current Workforce In
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 1000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-md  sm:text-lg md:text-xl font-bold mb-6">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  alt="course image"
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 ">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-xs">₹ {courseItem?.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
