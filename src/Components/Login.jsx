import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";


const Login = () => {
    const { signIn, googleSignInUser } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    // password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!/^(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/^(?=.*[a-z]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success(`Logged In Successfully`);

        //  navigate after login
        setTimeout(
          () => navigate(location?.state ? location.state : "/"),
          1000
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);

      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleSignInUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
      <div className=" min-h-[70vh] py-4 md:py-14 lg:py-20 bg-base-200">
        <div className="flex justify-center items-center mx-auto flex-col space-y-2">
          <h2 className=" text-3xl font-bold">Please Login</h2>
          <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={!showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                  />
                  <span className="absolute top-1/3 right-3" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                </div>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-700 text-white font-bold w-full"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className=" text-base">
                New here? Please{" "}
                <Link to="/register" className=" font-bold text-blue-600">
                  Register
                </Link>
              </p>
              <div className="flex flex-row items-center gap-4">
                <h5 className="hidden md:flex font-semibold text-lg text-gray-400">Login with </h5>
                <button
                  onClick={handleGoogleLogin}
                  className="btn  btn-outline text-base md:text-xl"
                >
                  <FcGoogle /> Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

    </>
  );
};

export default Login;
