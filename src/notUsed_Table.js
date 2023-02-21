import React, { useState } from "react";
import { Card, Button, Row, Badge } from "react-bootstrap";
import { ethers, BigNumber } from "ethers";
import iot from "./markabi.json";

import ErrorMessage from "./ErrorMessage";
//import jsonData from "./data.json";
import "./styles.css";
//code ot transfer the mone and buy the data
const contractaddre = "0x289e5fe8b95e7e854ac489e5207c6b1e8ce9ad91";
const buySens = async ({ setError, setTxsB, setTxs, setIpfsH, Sid, Price }) => {
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
    setError([err.message]);
  }
};

function Table({ txs }) {
  const [error, setError] = useState();
  const [btxs, setBtxs] = useState([]);
  const [txsB, setTxsB] = useState([]);
  const [ipfsH, setIpfsH] = useState([]);
  //handlebuy
  const handlebuy = async ({ Sid, Price }) => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    setError();
    await buySens(setError, setTxsB, setBtxs, setIpfsH, Sid, Price);
  };
  //if (txs.length === 0) return null;

  return (
    <div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1614728672820-e88260ce6d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80"
          className="bgimg "
          alt="Responsive image"
        />{" "}
      </div>
      <div>
        {txs.map((item, index) => {
          return (
            <div className="card-2 hover-shadow">
              <Card
                key={index}
                className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white"
              >
                <Card.Header>
                  {item.id} Sensor Tybe: {item.type1}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{item.descreption1}</Card.Title>
                  <Card.Text>
                    <p className="line">
                      {" "}
                      Ferequntl :{" "}
                      <Badge bg="secondary"> {item.frequency1} </Badge>
                    </p>
                    <p className="line">
                      {" "}
                      Latitude :{" "}
                      <Badge bg="secondary"> {item.latitude1} </Badge>
                    </p>
                    <div>
                      <p className="line">
                        {" "}
                        Longitude :{" "}
                        <Badge bg="secondary"> {item.longitude1} </Badge>{" "}
                      </p>
                      <p className="line">
                        {" "}
                        From Time:{" "}
                        <Badge bg="secondary"> {item.startTime1}</Badge>
                      </p>
                      <p className="line">
                        {" "}
                        To Time: <Badge bg="secondary"> {item.toTime}</Badge>
                      </p>
                    </div>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={handlebuy(item.id, item.price1)}
                  >
                    Buy now <Badge bg="secondary"> {item.price1} WieEher</Badge>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Table;
