import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import ChPrice from "./changePrice";
import ChSeller from "./changeSeller";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
//import "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min"  ;
//import "//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";
import "./sty.css";
//import "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
export default function footer() {
  return (
    <section id="footer">
      <div class="container">
        <div class="row text-center text-xs-center text-sm-left text-md-left">
          <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul class="list-unstyled quick-links">
              <li>
                <a href="/home">
                  <i class="fa fa-angle-double-right"></i>Home
                </a>
              </li>
              <li>
                <a href="/add">
                  <i class="fa fa-angle-double-right"></i>Add Data Sensor
                </a>
              </li>
              <li>
                <a href="/chPrice">
                  <i class="fa fa-angle-double-right"></i>Change Price
                </a>
              </li>
              <li>
                <a href="/chSeller">
                  <i class="fa fa-angle-double-right"></i>Change Seller
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-angle-double-right"></i>Videos
                </a>
              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul class="list-unstyled quick-links">
              <li>
                <a href="/home">
                  <i class="fa fa-angle-double-right"></i>Home
                </a>
              </li>
              <li>
                <a href="/add">
                  <i class="fa fa-angle-double-right"></i>Add Data Sensor
                </a>
              </li>
              <li>
                <a href="/chPrice">
                  <i class="fa fa-angle-double-right"></i>Change Price
                </a>
              </li>
              <li>
                <a href="/chSeller">
                  <i class="fa fa-angle-double-right"></i>Change Seller
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-angle-double-right"></i>Videos
                </a>
              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul class="list-unstyled quick-links">
              <li>
                <a href="/home">
                  <i class="fa fa-angle-double-right"></i>Home
                </a>
              </li>
              <li>
                <a href="/add">
                  <i class="fa fa-angle-double-right"></i>Add Data Sensor
                </a>
              </li>
              <li>
                <a href="/chPrice">
                  <i class="fa fa-angle-double-right"></i>Change Price
                </a>
              </li>
              <li>
                <a href="/chSeller">
                  <i class="fa fa-angle-double-right"></i>Change Seller
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-angle-double-right"></i>Videos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul class="list-unstyled list-inline social text-center">
              <li class="list-inline-item">
                <a href="https://www.fiverr.com/share/qb8D02">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.fiverr.com/share/qb8D02">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.fiverr.com/share/qb8D02">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.fiverr.com/share/qb8D02">
                  <i class="fa fa-google-plus"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.fiverr.com/share/qb8D02" target="_blank">
                  <i class="fa fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr />
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p class="h6">
              © All right Reversed.
              <a
                class="text-green ml-2"
                href="https://www.sunlimetech.com"
                target="_blank"
              >
                SENSORIUM
              </a>
            </p>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}
