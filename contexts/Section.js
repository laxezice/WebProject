import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
const AuthContext = createContext();

export const AuthSession = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoadedCookie, setIsLoadedCookie] = useState(false);
  const router = useRouter();
  // snackbar
  const [snackbar, setSnackbar] = useState([
    {
      open: false,
      text: "",
      severity: "", //["error", "info", "success", "warning"]
    },
  ]);
  const login = useCallback((account) => {
    setUser(account);
    setCookie("user", account, {
      path: "/",
      maxAge: 3600,
      sameSite: true,
    });
  }, []);

  const logout = () => {
    removeCookie("user", { path: "/" });
    setSnackbar({
      ...snackbar,
      open: true,
      text: "Logout is success",
    });
    setUser();
  };

  const showSnackbar = (text, severity) => {
    setSnackbar({ open: true, text: text, severity: severity });
  };

  const checkCookieAndRefreshToken = async () => {
    if (router.pathName === "/auth/profile") {
      router.push("/");
    }
    if (!isExpired(cookies?.user?.token)) {
      setUser(cookies.user);
    } else if (user && isExpired(cookies?.user?.token)){
      const refreshToken = user?.refToken;
      const res = await axios.post("/auth/token", { refToken: refreshToken });
      if (res.status === 200) {
        setUser({ ...user, refToken: res.refToken, token: res.token });
        setCookie("user", user, {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
        console.log(user);
      } else {
        setUser();
        removeCookie("user", { path: "/" });
        router.push("/auth/login");
      }
    }
    setIsLoadedCookie(true);
  };

  useEffect(() => {
    checkCookieAndRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        logout,
        isLoadedCookie,
        snackbar,
        showSnackbar,
        setSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
