import React from "react";
import bbLogo from "../../assets/bbLogo.svg";


function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">

      {/* Multiple Glassmorphic Circles with Orange Tint */}
      <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-60"></div>
      <div className="absolute top-20 right-20 w-48 h-48 rounded-full bg-orange-400/40 backdrop-blur-lg opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-orange-400/20 backdrop-blur-lg opacity-50"></div>
      <div className="absolute top-40 left-60 w-64 h-64 rounded-full bg-orange-400/25 backdrop-blur-lg opacity-55"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-60"></div>
      <div className="absolute top-60 left-80 w-56 h-56 rounded-full bg-orange-400/35 backdrop-blur-lg opacity-65"></div>
      <div className="absolute top-80 right-10 w-60 h-60 rounded-full bg-orange-400/50 backdrop-blur-lg opacity-40"></div>
      <div className="absolute bottom-20 left-80 w-40 h-40 rounded-full bg-orange-400/40 backdrop-blur-lg opacity-60"></div>
      <div className="absolute bottom-40 right-40 w-60 h-60 rounded-full bg-orange-400/25 backdrop-blur-lg opacity-55"></div>
      <div className="absolute top-10 right-60 w-50 h-50 rounded-full bg-orange-400/30 backdrop-blur-lg opacity-50"></div>

      {/* Content Wrapper */}
      <div className="text-center text-gray-800 z-10">
        {/* Big '404' */}
        <h1 className="text-9xl font-extrabold text-orange-600">404</h1>
        <p className="text-4xl font-semibold mt-6">Page Not Found</p>
        <p className="text-lg mt-4 opacity-80">Oops! The page you were looking for is not available.</p>
        <div className="flex items-center w-full justify-center animate-pulse">
        <img src={bbLogo} alt="404 Error" className="w-40 h-40" />
        </div>

        {/* Action Button */}
        <a
          href="/"
          className="mt-6 inline-block px-10 py-3 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-500 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
    
  );
}

export default NotFoundPage;
