import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCard from "./Components/CoffeeCard";
import { useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  const loadedCoffee = useLoaderData();
  const [allCoffee, setAllCoffee] = useState(loadedCoffee);
  console.log(allCoffee);

  return (
    <>
      <Navbar></Navbar>
      <div className=" px-20 text-center bg-base-200 ">
        <h1 className=" text-4xl font-bold py-10">Coffee Store</h1>
        <div className="grid grid-cols-2 gap-4">
          {allCoffee.map((coffee) => (
            <CoffeeCard
              key={coffee._id}
              coffee={coffee}
              allCoffee={allCoffee}
              setAllCoffee={setAllCoffee}
            ></CoffeeCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
