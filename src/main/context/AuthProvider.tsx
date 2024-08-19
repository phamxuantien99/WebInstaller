import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

// Interface cho Context
export interface AuthContextType {
  isLoggedIn: boolean;
  auth: string;
  setAuth: Dispatch<SetStateAction<string>>;
  selectedAnalysis: string;
  setSelectedAnalysis: (value: string) => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<any>>;
  userInfo: any;
  setDataAnalysis: Dispatch<SetStateAction<any>>;
  dataAnalysis: any;
}

// Tạo Context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook tùy chỉnh để sử dụng Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider của Context
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [auth, setAuth] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>({});
  const [selectedAnalysis, setSelectedAnalysis] = useState("gen-installation");
  const [dataAnalysis, setDataAnalysis] = useState<any>({});

  useEffect(() => {
    const authToken = localStorage.getItem("access_token_installation");
    if (authToken) {
      setAuth(authToken);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const authContextValue: AuthContextType = {
    auth,
    setAuth,
    isLoggedIn,
    setIsLoggedIn,
    setUserInfo,
    userInfo,
    selectedAnalysis,
    setSelectedAnalysis,
    setDataAnalysis,
    dataAnalysis,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
