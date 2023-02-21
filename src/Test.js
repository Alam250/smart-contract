import { ethers } from "ethers";
import React, { useState } from "react";
import iot from "./markabi.json";
import ErrorMessage from "./ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//code ot transfer the mone and buy the data
const contractaddre = "0xc7592CB5AAA47c115fC9949eBD617D633C1C365d";
const buySens = async ({ setError, setTxsB, setTxs, setIpfsH, Sid, Price }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    /*ethers.utils.getAddress(contractaddre);
    const tx = await signer.sendTransaction({
      to: contractaddre,
      value: ethers.utils.parseEther(Price)
    });
    setTxs([tx]);*/
    const iotmarket = new ethers.Contract(contractaddre, iot, signer);
    const txB = await iotmarket.buyData(Sid);
    const hash = await iotmarket.Hashview();
    console.log("hash", hash);
    setIpfsH([hash]);
    setTxsB([txB]);
  } catch (err) {
    setError(err.message);
  }
};
////////////
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

///////////
export default function TxListofaddSensor({ txsAdd }) {
  //handel function to buy the data and send the eher to user
  const [error, setError] = useState();
  const [btxs, setBtxs] = useState([]);
  const [txsB, setTxsB] = useState([]);
  const [txs, setTxs] = useState([]);
  const [ipfsH, setIpfsH] = useState([]);
  //handlebuy
  const handlebuy = async (event, Sid, Price) => {
    event.preventDefault();
    const addr = "0xc7592CB5AAA47c115fC9649eBD617D633C1C365d";
    setError();
    await startPayment({ setError, setTxs, ether: Price, addr: addr });
    await buySens({
      setError,
      setTxsB,
      setBtxs,
      setIpfsH,
      Sid: Sid,
      Price: Price
    });
  };
  //to display the sensor and liesnt from blockchain
  if (txsAdd.length === 0) return null;
  return (
    <>
      <div className="card">
        {txsAdd.map((item) => (
          <div className=" mt-4 p-4 card-2 hover-shadow credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
            <div>
              <p>id: {item.id}</p>
            </div>
            <div className="card-body">
              <Row>
                <Col>type: {item.type1}</Col>
                <Col>frequency: {item.frequency1} </Col>
                <Col>latitude: {item.latitude1}</Col>
              </Row>
              <Row></Row>
              <Row>
                <Col>longitude: {item.longitude1}</Col>
                <Col>From Time: {item.startTime1}</Col>
                <Col>TO Time: {item.toTime}</Col>
              </Row>
              <p className="text-justify">descreption: {item.descreption1}</p>
            </div>
            <footer>
              <button
                onClick={(event) => handlebuy(event, item.id, item.price)}
                className="btn btn-primary  focus:ring focus:outline-none w-full"
                variant="primary"
              >
                Buy now <p> {item.price} Eher</p>
              </button>
              <br />
              <div>
                <a
                  className="alert-link"
                  href={`https://goerli.etherscan.io/tx/${item.txHash}`}
                  target="_blank"
                >
                  Check in block explorer
                </a>
              </div>
            </footer>
            <br />
            <h6>
              <a
                className=" alert-link"
                target="_blank"
                href={`https://${ipfsH}.ipfs.nftstorage.link`}
              >
                Buyed Data
              </a>
            </h6>
          </div>
        ))}
      </div>
      <ToastContainer limit={1} />
      <ErrorMessage message={error} />
    </>
  );
}
