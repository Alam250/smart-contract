import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import iot from "./markabi.json";
import ErrorMessage from "./ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import TxList from "./TxList";
const contractaddre = "0x289e5fe8b95e7e854ac489e5207c6b1e8ce9ad91";
const sencEth = async ({ setError, setTxsB, setTxs, setIpfsH, Sid, Price }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    ethers.utils.getAddress(contractaddre);
    const tx = await signer.sendTransaction({
      to: contractaddre,
      value: ethers.utils.parseEther(Price)
    });
    setTxs([tx]);
    const iotmarket = new ethers.Contract(contractaddre, iot, signer);
    const txB = await iotmarket.buyData(Sid);
    const hash = await iotmarket.Hashview();
    setIpfsH([hash]);
    setTxsB([txB]);
  } catch (err) {
    setError(err.message);
  }
};

function AddSens() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [txsB, setTxsB] = useState([]);
  //handlebuy
  const handlebuy = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
  };

  return (
    <div className="container">
      <div className="col-sm-12"></div>
      <div className="col-sm-12">
        <form>
          <div className="form-group">
            <input
              className="form-control"
              type="YourCompanyName"
              placeholder="Your Company Name:"
              name="YourCompanyName"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="BusinessSector"
              placeholder="Business Sector:"
              name="BusinessSector"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="Numberofemployees"
              placeholder="Number of employees:"
              name="Numberofemployees"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="location"
              placeholder="Company Location:"
              name="ComapanyLocation"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="ContactName"
              placeholder="Contact name:"
              name="ContactName"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="JobTitle"
              placeholder="Contact Job Title:"
              name="JobTitle"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="ContactEmail"
              placeholder="Contact Email:"
              name="ContactEmail"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="ContactTelephone"
              placeholder="Contact Telephone:"
              name="ContactTelephone"
            />{" "}
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSens;
