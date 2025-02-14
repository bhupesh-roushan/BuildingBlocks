import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function InstructorHeader() {
  const { resetCredentials } = useContext(AuthContext);
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }
  return (
    <header className="fixed h-16 top-0 left-0 right-0 z-10 flex items-center justify-between  bg-white border-b border-gray-200 px-10">
      <div>
        {" "}
        <Link to={"/"}>
          <img
            src="/src/assets/bbLogo.svg"
            alt="logo"
            className="w-36 h-36 mr-4 ml-5"
          />
        </Link>
      </div>
      <div>
        <Link>
          <p className="text-sm hover:text-orange-600 hover:underline transition-all font-bold ease-in-out">
            Dashboard
          </p>
        </Link>
      </div>
      <div>
        <Button
          onClick={() => handleLogout()}
          size="sm"
          className="bg-orange-500 hover:bg-orange-500 hover:scale-105 transition-all"
        >
          SignOut
        </Button>
      </div>
    </header>
  );
}

export default InstructorHeader;
