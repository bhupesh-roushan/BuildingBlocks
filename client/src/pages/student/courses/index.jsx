import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { filterOptions, sortOptions } from "../../../config/index.js";
import { AuthContext } from "../../../context/auth-context/index";
import { StudentContext } from "../../../context/student-context/index";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "../../../services/index.js";
import { ArrowDownUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//this function will create a query string from the filters object as a helper for the useSearchParams hook

function createSearchParamsHelper(filtersParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramsValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
    }
  }
  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // for getting the filters from the url

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    //key items = getSectionId and options = getCurrentOption where key item = Categoriy,Level,  primaryLanguage and options = option of each key item

    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSection, getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(copyFilters);
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption.id);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  //for fetching all the courses

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
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

  // for setting the search params in the url each time when the filters are changed

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  //for fetching the courses on page load

  useEffect(() => {
    if (filters !== null && sort !== null) {
      fetchAllStudentViewCourses(filters, sort);
    }
  }, [filters, sort]);

  //if the filters are selected and refreshes the page the courses will be fetched with the same filters but with price low to high

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  //if going back to the home page the filters will be cleared

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {/* filter options contains of the categories, level, primary language and this map will give each category a list of options and return an array of courseCategories,courseLevelOptions,  languageOptions */}

            {Object.keys(filterOptions).map((keyItem) => (
              <div className="p-4 border-b">
                <h3 className="font-bold  mb-3">{keyItem?.toUpperCase()}</h3>
                <div className="grid  gap-2 mt-2">
                  {/* this will map on  courseCategories,courseLevelOptions, languageOptions and return an array of option of each category */}

                  {filterOptions[keyItem].map((options) => (
                    //
                    <Label className="flex font-mediumitems-center gap-3">
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(options.id) > -1
                        }
                        onCheckedChange={() =>
                          //key item = courseCategories,courseLevelOptions,  languageOptions and options = option of each category
                          handleFilterOnChange(keyItem, options)
                        }
                      />
                      {options.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="text-xs font-bold">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem?.id}>
                      {sortItem?.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentViewCoursesList.length} Results
            </span>
          </div>
          <div className="spcey-y-4">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem) => (
                <Card
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  key={courseItem?.id}
                  className="mb-4 cursor-pointer"
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0 ">
                      <img
                        src={courseItem?.image}
                        alt="course image"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className=" text-md md:text-lg mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By{" "}
                        <span className="font-bold">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-xs mt-3 text-gray-600 mb-2">{`${
                        courseItem?.curriculum.length
                      } ${
                        courseItem?.curriculum?.length <= 1
                          ? "Lecture"
                          : "Lectures"
                      } - ${courseItem?.level.toUpperCase()} Level `}</p>
                      <p className="font-bold text-sm sm:text-md">
                        {" "}
                        ₹ {courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loadingState ? (
              <Skeleton />
            ) : (
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
