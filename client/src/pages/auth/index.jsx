import CommonForm from "../../components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInFromControls, signUpFromControls } from "../../config/index.js";
import { AuthContext } from "../../context/auth-context/index";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { LuLinkedin } from "react-icons/lu";
import { FaGlobe } from "react-icons/fa";
import bb from "./../../assets/bb.svg"
import bbLogo from "./../../assets/bbLogo.svg"

function AuthPage() {
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    isSignIn,
    setIsSignIn,
  } = useContext(AuthContext);

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }
  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky bg-white top-0 px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex  items-center justify-center">
          <img
            src={bbLogo}
            alt="logo"
            className="w-36 h-36 mr -4"
          />
        </Link>
      </header>

      <div
        className={` flex items-center justify-center min-h-[100%] bg-background mt-16 mb-5 ml-5 mr-5 `}
      >
        <Card className="p-4  w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              {isSignIn ? "Sign In to your Account" : "Create a New Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignIn
                ? "Enter your Email and Password to access your account"
                : "Enter your details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {isSignIn ? (
              <CommonForm
                formControls={signInFromControls}
                buttonText={"Sign In"}
                formData={signInFormData}
                setFormData={setSignInFormData}
                isButtonDisabled={!checkIfSignInFormIsValid()}
                handleSubmit={handleLoginUser}
              />
            ) : (
              <CommonForm
                formControls={signUpFromControls}
                buttonText={"Sign Up"}
                formData={signUpFormData}
                setFormData={setSignUpFormData}
                isButtonDisabled={!checkIfSignUpFormIsValid()}
                handleSubmit={handleRegisterUser}
              />
            )}
            <p className="text-center text-sm mt-4">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className=" hover:underline text-orange-500 font-semibold mt-5"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        <h1 className=" mt-4 md:mt-8 mb-2 md:mb-5 w-full text-sm md:text-3xl lg:text-4xl text-center opacity-15 from-white to-black font-bold font-stretch-125% md:font-stretch-200% text-transparent bg-clip-text bg-gradient-to-r">
          BUILDING KNOWLEDGE BLOCK BY BLOCK
        </h1>
        <div className="fixed mt-5  bottom-5 flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center">
            <img
              src={bb}
              alt="logo"
              className="w-3 md:w-5 mt-2 animate-pulse"
            />
          </div>
          <p className="text-xs text-center opacity-60 mt-2">
            © Bhupesh Roushan 2025. All Rights Reserved @ BuildingBlocks
          </p>

          <div className="flex flex-row gap-2 mt-2 mb-5">
            <Link to="https://www.instagram.com/roushanwa" target="_blank">
              <PiInstagramLogoFill className="hover:scale-120 hover:text-red-600 hover:opacity-100 transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to="https://www.linkedin.com/in/roushanb" target="_blank">
              <FaGithub className="hover:scale-120 hover:text-black hover:opacity-100 transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to="https://github.com/bhupesh-roushan" target="_blank">
              <LuLinkedin className="hover:scale-120 hover:text-blue-700 hover:opacity-100 transition-all w-3 md:w-5 opacity-70" />
            </Link>
            <Link to="https://bhupeshroushan.vercel.app" target="_blank">
              <FaGlobe className="hover:scale-120 hover:text-orange-600 hover:opacity-100 transition-all w-3 md:w-4 opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
