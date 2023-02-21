import { Navbar, Nav } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import ChPrice from "./changePrice";
import ChSeller from "./changeSeller";
import { ethers, BigNumber } from "ethers";
import iot from "./markabi.json";
import ErrorMessage from "./ErrorMessage";
import Test from "./Test";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
function Div() {
  const [txsAdd, setTxsAdd] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [contractInfo, setContractInfo] = useState({
    address: "0xc7592CB5AAA47c115fC9649eBD617D633C1C365d"
  });
  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(contractInfo.address, iot, provider);

      erc20.on(
        "SensorCreated",
        (
          seller1,
          id,
          type1,
          price1,
          toTime,
          startTime1,
          frequency1,
          latitude1,
          longitude1,
          url1,
          descreption1,
          event
        ) => {
          console.log({
            seller1,
            id,
            type1,
            price1,
            toTime,
            startTime1,
            frequency1,
            latitude1,
            longitude1,
            url1,
            descreption1,
            event
          });
          setTxsAdd((currentTxs) => [
            ...currentTxs,
            {
              txHash: event.transactionHash,
              seller1,
              id,
              type1,
              price: ethers.utils.formatEther(price1),

              toTime,
              startTime1,
              frequency1,
              latitude1,
              longitude1,
              url1,
              descreption1
            }
          ]);
        }
      );
      setContractListened(erc20);
      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  //setContractListened(erc20);

  const [tableData, setTableData] = useState([]);
  const [formInputData, setformInputData] = useState({
    price: "",
    freq: "",
    tyep: "",
    sTime: "",
    toTime: "",
    latit: "",
    long: "",
    descr: ""
  });

  const handleChange = (evnt) => {
    const newInput = (data) => ({
      ...data,
      [evnt.target.name]: evnt.target.value
    });
    setformInputData(newInput);
  };

  const handleSubmit = (evnt) => {
    //evnt.preventDefault();
    const checkEmptyInput = !Object.values(formInputData).every(
      (res) => res === ""
    );
    if (checkEmptyInput) {
      const newData = (data) => [...data, formInputData];
      setTableData(newData);
      const emptyInput = {
        seller: "",
        price: "",
        freq: "",
        tyep: "",
        sTime: "",
        toTime: "",
        latit: "",
        long: "",
        ipfs: "",
        descr: "",
        newPrice: "",
        sens_id: "",
        newSe: ""
      };
      setformInputData(emptyInput);
    }
  };
  ///////////////////////////
  return (
    <Router>
      <div>
        <Navbar className="{/*fixed-top*/ }" bg="black" variant={"dark"}>
          <Navbar.Brand href="/home">
            <img src="https://www.hosamdev.com/assets/images/alam.jpg" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add">
              Add Sensor
            </Nav.Link>
            <Nav.Link as={Link} to="/chPrice">
              Change Price
            </Nav.Link>
            <Nav.Link as={Link} to="/chSeller">
              Change Seller
            </Nav.Link>
          </Nav>{" "}
        </Navbar>{" "}
      </div>
      <div>
        <Switch>
          <Route path="/home">
            {" "}
            <Test txsAdd={txsAdd} />
          </Route>
          <Route path="/add">
            <FormInput
              handleChange={handleChange}
              formInputData={formInputData}
              handleSubmit={handleSubmit}
            />
          </Route>
          <Route path="/chPrice">
            <ChPrice
              handleChange={handleChange}
              formInputData={formInputData}
            />
          </Route>
          <Route path="/chSeller">
            {" "}
            <ChSeller
              handleChange={handleChange}
              formInputData={formInputData}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default Div;
