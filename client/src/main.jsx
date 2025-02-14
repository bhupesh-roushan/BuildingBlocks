import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import InstructorProvider from "./context/instructor-context";
import StudentContextProvider from "./context/student-context";
import { Toaster } from "sonner";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentContextProvider>
          <App />
          <Toaster richColors position="bottom-right" />
        </StudentContextProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
