import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" bg-gray-950 text-white flex gap-10 justify-center font-bold py-6 ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/addCoffee">Add Coffee</NavLink>
    </div>
  );
};

export default Navbar;
