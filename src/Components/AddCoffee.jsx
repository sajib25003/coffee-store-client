import Swal from "sweetalert2";
import Navbar from "./Navbar";

const AddCoffee = () => {
  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;

    const newCoffee = {
      name,
      quantity,
      supplier,
      taste,
      category,
      details,
      photo,
    };
    console.log(newCoffee);

    // send data to server
    fetch("https://coffee-store-server-zeta-two.vercel.app/coffee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Coffee Added Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="flex flex-col justify-center items-center pt-6 bg-base-200 md:min-h-screen">
        <h3 className=" text-lg lg:text-4xl font-bold text-green-700 ">
          Add Coffee here
        </h3>
        <div className="hero">
          <div className="px-3 lg:px-20 flex-col w-full">
            <div className="card shrink-0 md:w-full  ">
              <form onSubmit={handleAddCoffee} className="card-body">
                {/* row: coffee name  & Quantity */}
                <div className=" flex flex-col md:flex-row md:gap-5">
                  <div className="form-control flex-grow">
                    <label className="label">
                      <span className="label-text">Coffee Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Coffee Name"
                      name="name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control  flex-grow">
                    <label className="label">
                      <span className="label-text">Available Quantity</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Available Quantity"
                      name="quantity"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                {/* row: Supplier  & Taste */}
                <div className=" flex flex-col md:flex-row gap-5">
                  <div className="form-control  flex-grow">
                    <label className="label">
                      <span className="label-text">Supplier</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Supplier"
                      name="supplier"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control  flex-grow">
                    <label className="label">
                      <span className="label-text">Taste</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Taste"
                      name="taste"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                {/* row: Category  & Details */}
                <div className=" flex flex-col md:flex-row gap-5">
                  <div className="form-control flex-grow">
                    <label className="label">
                      <span className="label-text">Category</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Category"
                      name="category"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control flex-grow">
                    <label className="label">
                      <span className="label-text">Details</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Details"
                      name="details"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                {/* row: photo URL */}
                <div className=" flex gap-5">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Photo URL"
                      name="photo"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                {/* Add Coffee Button */}
                <div className="form-control mt-6">
                  <input
                    className="btn btn-block w-full"
                    type="submit"
                    value="Add Coffee"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoffee;
