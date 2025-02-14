import { Skeleton } from "../../components/ui/skeleton";
import {
  initialSignInFormData,
  initialSignUpFormData,
} from "../../config/index.js";
import {
  checkAuthService,
  loginService,
  registerService,
} from "../../services/index.js";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [isSignIn, setIsSignIn] = useState(true);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  //for loading the skeleton screen
  const [Loading, setLoading] = useState(true);

  //for register user

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    toast.success(data?.message);
    if (data?.success) {
      setIsSignIn(true);
      setSignUpFormData({
        ...initialSignUpFormData,
      });
    }
  }

  //for login user
  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);

      //for storing the token in session storage so that when the page refreshes we can check if the user is logged in or not

      if (data.success) {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        toast.success(data?.message);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid");
    }
  }

  // check auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  //for resetting the credentials on logout
  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    toast.success("You have been logged out successfully");
  }

  //for checking if the user is authenticated on page load
  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        isSignIn,
        setIsSignIn,
      }}
    >
      {
        //if the user is authenticated then show the children otherwise show the loading screen
        Loading ? <Skeleton /> : children
      }
    </AuthContext.Provider>
  );
}
