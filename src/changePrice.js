import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import iot from "./markabi.json";
import ErrorMessage from "./ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import TxList from "./TxList";
const contractaddre = "0xc7592CB5AAA47c115fC9949eBD617D633C1C365d";
const changpr = async ({ setError, setTxs, sId, newPrice }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const iotmarket = new ethers.Contract(contractaddre, iot, signer);
    const tx = await iotmarket.changeSensorPrice(sId, newPrice);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};
export default function ChangePrice({ handleChange, formInputData }) {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handlePric = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await changpr({
      setError,
      setTxs,
      sId: data.get("sens_id"),
      newPrice: data.get("newPrice")
    });
  };
  return (
    <form className="m-4 " onSubmit={handlePric}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            CHANGE SENSOR PRICE
          </h1>

          <div className="my-3">
            <h5>Your Sensor ID :</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.sens_id}
              name="sens_id"
              className="form-control"
              placeholder="Sensor ID"
            />
          </div>
          <div className="my-3">
            <h5>New Sensor Price:</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.newPrice}
              name="newPrice"
              className="form-control"
              placeholder="New Sensor Price"
            />
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="form-control btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Change Price
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
