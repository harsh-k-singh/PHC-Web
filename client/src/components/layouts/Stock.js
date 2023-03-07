import React, { useState, useContext, useEffect } from "react";
import AddStock from "./AddStock";
import ViewStock from "./ViewStock";
import Select from "react-select";
import AdminContext from "../../context/admin/AdminContext";
import SearchedStock from "./SearchedStock";

const aquaticCreatures = [
  { label: "Shark", value: "Shark" },
  { label: "Dolphin", value: "Dolphin" },
  { label: "Whale", value: "Whale" },
  { label: "Octopus", value: "Octopus" },
  { label: "Crab", value: "Crab" },
  { label: "Lobster", value: "Lobster" },
];

const Stock = () => {
  const [action, setAction] = useState("view");

  const adminContext = useContext(AdminContext);
  const { getStock, stocks } = adminContext;
  useEffect(() => {
    const func = async () => {
      await getStock();
      console.log("stock", stocks);
    };
    func();
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const onChange = (e) => {
    setAction("search");
    setSelectedOption(e);
  };
  const medOptions = stocks
    ? stocks.map((opt) => ({ label: opt.name, value: opt.name }))
    : null;

  return (
    <div className='container mt-3'>
      <div className='mb-3 text-center'>
        <button
          class={`btn ${
            action === "view" ? "btn-info" : "btn-outline-info"
          } mx-2`}
          onClick={() => setAction("view")}
        >
          View Stock
        </button>
        <button
          class={`btn ${
            action === "add" ? "btn-info" : "btn-outline-info"
          } mx-2`}
          onClick={() => setAction("add")}
        >
          Add Stock
        </button>
      </div>
      <div className='container my-4' style={{ width: "30%" }}>
        <Select
          options={medOptions}
          placeholder='Search stock...'
          value={selectedOption}
          onChange={onChange}
        />
      </div>
      {action === "view" ? (
        <ViewStock />
      ) : action === "search" ? (
        <SearchedStock name={selectedOption.value} />
      ) : (
        <AddStock />
      )}
    </div>
  );
};

export default Stock;
