import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, allCoffee, setAllCoffee }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-store-server-zeta-two.vercel.app/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Successfully deleted!",
                icon: "success",
              });
              const remaining = allCoffee.filter(cof => cof._id !== _id);
              setAllCoffee(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="hero bg-base-200 rounded-xl">
      <div className="hero-content flex-col lg:flex-row w-full bg-blue-50 rounded-xl ">
        <img
          src={photo}
          className="rounded-lg shadow-2xl w-[200px] p-4"
          alt="Coffee Image"
        />
        <div className="flex-grow">
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-col items-start flex-grow">
              <h1 className="text-xl font-bold text-blue-500">{name}</h1>
              <p className="py-2 text-gray-500 text-left font-semibold">
                <span className=" text-left font-normal text-blue-800">
                  Details:{" "}
                </span>{" "}
                {details}
              </p>
              <p className="py-2 text-gray-500 font-semibold">
                <span className="font-normal text-blue-800">Quantity: </span>{" "}
                {quantity}
              </p>
              <p className="py-2 text-gray-500 font-semibold">
                <span className="font-normal text-blue-800">Supplier: </span>{" "}
                {supplier}
              </p>
              <p className="py-2 text-gray-500 font-semibold">
                <span className="font-normal text-blue-800">Taste: </span>{" "}
                {taste}
              </p>
              <p className="py-2 text-gray-500 font-semibold">
                <span className="font-normal text-blue-800">Category: </span>{" "}
                {category}
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <button className="btn  bg-gray-600 text-white font-bold">
                View
              </button>
              <Link to={`/updateCoffee/${_id}`}>
                <button className="btn  bg-gray-600 text-white font-bold">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn  bg-gray-600 text-white font-bold"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CoffeeCard.propTypes = {
  coffee: PropTypes.object,
  allCoffee: PropTypes.array,
  setAllCoffee: PropTypes.func,
};

export default CoffeeCard;
