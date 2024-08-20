import React, { useContext, useRef, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../api/api";
import logo2 from "../../assets/images/logo2.png";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import { api } from "../service/api/endpoint";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext) as AuthContextType;
  const loginFormRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    apiAxios
      .post(api.getLogin, {
        user_name: username,
        password: password,
      })
      .then((res) => {
        const accessToken = res.data.access_token;
        localStorage.setItem("access_token_installation", accessToken);
        localStorage.setItem("expiration_installation", res.data.expiration);
        localStorage.setItem(
          "refresh_token_installation",
          res.data.refresh_token
        );
        localStorage.setItem(
          "expiration_refresh_token_installation",
          res.data.expiration_refresh_token
        );
        localStorage.setItem("username", res.data.user_info.user_name);
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((e) => {
        setIsLoggedIn(false);
        switch (e.response.status) {
          case 401:
            alert("Unauthorized");
            break;
             case 403:
            alert("Username or password is incorrect");
            break;
          default:
            alert("Something went wrong, please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* <!-- left side --> */}
        <form ref={loginFormRef} onSubmit={(e) => handleLogin(e)}>
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">
              Installation Report Generation
            </span>
            <span className="font-light text-gray-400 mb-8">
              Welcom back! Please enter your details
            </span>
            <div className="py-4">
              <span className="block text-gray-700 text-lg font-bold mb-2">
                Username
              </span>
              <input
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="py-4">
              <span className="block text-gray-700 text-lg font-bold mb-2">
                Password
              </span>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                <div
                  className="btn btn-square"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
              </div>
            </div>

            <button
              className={`btn btn-primary ${loading && "loading"}`}
              disabled={loading || !!!username || !!!password}
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
        {/* <!-- right side --> */}
        <div className="relative flex justify-center items-center">
          <img
            className="w-[500px]"
            // src={require("../../assets/images/logo2.png")}
            src={logo2}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
