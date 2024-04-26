import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photoURL } = data;
    console.log(name, email);

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
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const createdAt = result.user.metadata.createdAt;
        const user = { email, createdAt };
        fetch("https://coffee-store-server-zeta-two.vercel.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "User Added Successfully!",
                  icon: "success",
                  confirmButtonText: "Cool",
                });
              }
          });

        // toast.success(`Account Created Successfully`);
        updateUserProfile(name, photoURL)
          .then(() => {
            // setTimeout(() => (window.location.href = "/"), 1000);
            // window.location.href = "/";
          })
          .catch((error) => console.error(error));
      })

      .catch((error) => {
        // console.error(error);
        toast.error(error.message);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="">
        <div className="py-20 bg-base-200">
          <div className="hero-content mx-auto flex-col space-y-2">
            <h2 className=" text-3xl font-bold">Please Register</h2>
            <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
              {/* onSubmit={handleRegister} */}
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className=" text-red-300 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="input input-bordered w-full"
                    {...register("photoURL")}
                  />
                  {errors.photoURL && (
                    <span className=" text-red-300 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className=" text-red-300 mt-1">
                      This field is required
                    </span>
                  )}
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
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className=" text-red-300 mt-1">
                        This field is required
                      </span>
                    )}
                    <span
                      className="absolute  top-1/3 right-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </span>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <div className="flex gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("terms", { required: true })}
                    />
                    <label htmlFor="terms">
                      Please Read and Accept our{" "}
                      <a href="#">Terms & Conditions</a>
                    </label>
                  </div>
                  {errors.terms && (
                    <span className=" text-red-300 mb-2">
                      Please accept our Terms & Condition
                    </span>
                  )}

                  <input
                    className="btn bg-gray-700 text-white font-bold w-full"
                    type="submit"
                    value="Register"
                  />
                </div>
                <p className=" text-base">
                  Already have an account? Please{" "}
                  <Link to="/login" className=" font-bold text-blue-600">
                    Login
                  </Link>
                </p>
              </form>
              {/* {
                regError ? (notifyError) : (notifySuccess)
            } */}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
