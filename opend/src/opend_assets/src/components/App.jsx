import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";
function App() {
 const NFTID = "rkp4c-7iaaa-aaaaa-aaaca-cai";
 const hostname = window.location.host;
 const fullhostname = "http://" + hostname + "/";
 //console.log(fullhostname);
  return (
    <div className="App">
      <Header />
      <Minter/>
      {/* <Item id ={NFTID} hostname ={fullhostname}/> */}
      {/* <img className="bottom-space" src={homeImage} /> */}
      <Footer />
     
    </div>
  );
}

export default App;
