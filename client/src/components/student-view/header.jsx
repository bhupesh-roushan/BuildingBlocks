import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Monitor } from "lucide-react";
import { AuthContext } from "../../context/auth-context/index";
import bbLogo from "./../../assets/bbLogo.svg";

function StudentViewCommonHeader() {
  //for logout

  const { resetCredentials } = useContext(AuthContext);
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  const navigate = useNavigate();

  return (
    <header className="flex bg-white items-center justify-between p-4 border-b sticky top-0 z-20 w-full">
      <div className="flex items-center space-x-4">
        <Link to={"/home"} className="flex items-center space-x-2">
          <img
            src={bbLogo}
            alt="logo"
            className="h-6 md:h-8 hover:scale-105 transition-all"
          />
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="text-[10px] hover:bg-transparent hover:text-orange-600 md:text-[12px] transition-all hover:scale-105 cursor-pointer"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex items-center cursor-pointer  gap-3 hover:text-orange-600 hover:scale-105 transition-all"
          >
            <span className="text-[10px] md:text-[12px]">My Courses</span>
            <Monitor className="h-6 w-6 md:h-8 md:w-8 cursor-pointer text-orange-600" />
          </div>
          <Button
            size="sm"
            variant="ghost"
            className=" cursor-pointer text-[10px] hover:bg-white hover:text-orange-600 md:text-[12px] transition-all hover:scale-105"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
