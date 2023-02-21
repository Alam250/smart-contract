import React, { useState } from "react";
import { ethers } from "ethers";
import iot from "./markabi.json";
import ErrorMessage from "./ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import { NFTStorage, File } from "nft.storage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { Form, Select } from "react-bootstrap/Form";
import TxList from "./TxList";
const contractaddre = "0xc7592CB5AAA47c115fC9949eBD617D633C1C365d";

const addSens = async ({
  setError,
  setTxs,
  seller,
  price,
  freq,
  type,
  sTime,
  toTime,
  latit,
  long,
  ipfsH,
  desc
}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const iotmarket = new ethers.Contract(contractaddre, iot, signer);
    const tx = await iotmarket.createSensor(
      seller,
      type,
      price,
      sTime,
      toTime,
      freq,
      latit,
      long,
      ipfsH,
      desc
    );
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};
/*******************the tocken for conecting by nft.storeg****************************************** */
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzNjE4YkQzNzBGQjk4QjFmNzAyMDBCMWE3NEFCMUZiOUI0MmE2YUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDU5NTkxMDM2MywibmFtZSI6InVwbG9hZElQRlMifQ.6jMtLP6WssVE_0sJIwQ0HQ5CSCIVJZz-R1sIGp9tl0c";
const nft = new NFTStorage({
  endpoint: "https://api.nft.storage",
  token
});
/************************************************************* */
function FormInput({ handleChange, formInputData, handleSubmit }) {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [iepf, setIepf] = useState("");
  const handlSens = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setError();
    await addSens({
      setError,
      setTxs,
      seller: data.get("seller"),
      type: data.get("tyep"),
      price: data.get("price"),
      freq: data.get("freq"),
      sTime: data.get("sTime"),
      toTime: data.get("toTime"),
      latit: data.get("latit"),
      long: data.get("long"),
      ipfsH: data.get("ipfs"),
      desc: data.get("descr")
    });
    handleSubmit();
  };
  /**********to upload file in ipfs and get back the hash ******* */
  const run = async () => {
    const uploadElement = document.getElementById("upload");
    const inputElement = document.getElementById("input");
    uploadElement.addEventListener("click", handleFiles, false);

    async function getHash(algorithm, data) {
      const main = async (msgUint8) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
        const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
      };

      if (data instanceof Blob) {
        const arrayBuffer = await data.arrayBuffer();
        const msgUint8 = new Uint8Array(arrayBuffer);
        return await main(msgUint8);
      }
    }

    async function handleFiles() {
      console.log("two", inputElement.files);
      const out = await nft.storeDirectory(inputElement.files);
      console.log("out", out);
      setIepf(out);
      alert(out);
      const text = "Test.";

      async function digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hash = await crypto.subtle.digest("SHA-256", data);
        const hashHex = await getHash("SHA-256", data);

        console.log("hashHex", hashHex);

        return hash;
      }

      //const digestBuffer = await digestMessage(text);
      //console.log(digestBuffer.byteLength);
    }
  };
  /************************************************************* */

  return (
    <form className="m-4" onSubmit={handlSens}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Add Sensor Data To Blockchain
          </h1>
          <div className="my-3">
            <h5>Seller Account :</h5>
            <input
              type="text"
              onChange={handleChange}
              value={formInputData.seller}
              name="seller"
              className="form-control"
              placeholder="Seller Account"
            />
          </div>
          {/* <div className="my-3">
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.tyep}
              name="tyep"
              className="form-control"
              placeholder="tyep"
            />
          </div>*/}
          <div className="my-3">
            <h5>Select Sensor Type :</h5>
            <select
              onChange={handleChange}
              value={formInputData.tyep}
              name="tyep"
              type="text"
              aria-label="Default select example"
              className="form-control"
            >
              <option value="0">Sensor Type</option>
              <option value="dew point">dew point</option>
              <option value="max-temperature">max-temperature</option>
              <option value="mean-sea-level">mean-sea-level</option>
              <option value="min-temperature">min-temperature</option>
              <option value="rainfall">rainfall</option>
              <option value="releative-humidity">releative-humidity</option>
              <option value="sun-shine">sun-shine</option>
              <option value="vapour-pressure">vapour-pressure</option>
              <option value="wind-direction">wind-direction</option>
              <option value="wind-speed">wind-speed</option>
            </select>
          </div>
          <div className="my-3">
            <h5>Data price :</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.price}
              name="price"
              className="form-control"
              placeholder="price"
            />
          </div>
          <div className="my-3">
            <h5>Form Time :</h5>
            <input
              type="date"
              onChange={handleChange}
              value={formInputData.sTime}
              name="sTime"
              className="form-control"
              placeholder="Start Time"
            />
          </div>
          <h5>To Time :</h5>
          <div className="my-3">
            <input
              type="date"
              onChange={handleChange}
              value={formInputData.toTime}
              name="toTime"
              className="form-control"
              placeholder="To Time"
            />
          </div>{" "}
          <div className="my-3">
            <h5>Frequency By Day :</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.freq}
              name="freq"
              className="form-control"
              placeholder="frequency"
            />
          </div>
          <div className="my-3">
            <h5>IN Latitude</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.latit}
              name="latit"
              className="form-control"
              placeholder="latitude"
            />
          </div>
          <div className="my-3">
            <h5>IN Longitude</h5>
            <input
              type="number"
              onChange={handleChange}
              value={formInputData.long}
              name="long"
              className="form-control"
              placeholder="longitude"
            />
          </div>
          <div className="my-3">
            <h5>Add Some Descreption :</h5>
            <textarea
              type="text"
              onChange={handleChange}
              value={formInputData.descr}
              name="descr"
              className="textarea form-control w-full h-24 textarea-bordered focus:ring focus:outline-none"
              placeholder="Descreption Of Sensor"
            />
          </div>
          <div className="my-3 ">
            <h5>Upload Sensor Data To Ipfs :</h5>
            <input
              type="text"
              onChange={handleChange}
              value={iepf}
              name="ipfs"
              className="form-control"
              placeholder="Ipfs hash"
              aria-label="Disabled input example"
              readOnly
            />{" "}
          </div>
          <div className="my-3 ">
            <input
              type="file"
              id="input"
              name="ipfsfile"
              className="form-control"
              placeholder="Ipfs hash"
            />
          </div>
          <div className="my-3">
            <button
              type="button"
              id="upload"
              onClick={run}
              className="form-control btn btn-secondary submit-button focus:ring focus:outline-none w-full"
            >
              Upload
            </button>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="form-control btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Adding now
          </button>

          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
export default FormInput;
