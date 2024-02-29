import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import Minter from "./Minter";
import { BrowserRouter, Link, Switch,Route }  from "react-router-dom";
import Gallery from "./Gallery";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import { useState } from "react";

function Header() {

const [userownedGallary, setownedGallary] = useState();

  async function getNfts(){
   const userNFTIds = await opend.getOwnedNFTs(CURRENT_USER_ID);
   //console.log(userNFTIds);
   setownedGallary(<Gallery title ="My NFTS" ids={userNFTIds}/>);

  };

  useEffect(()=> {
getNfts();
  },[])
  return (
    <BrowserRouter forceRefresh={true}>
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <h5 className="Typography-root header-logo-text">
            <Link to="/">SMARK</Link></h5>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3" >
            <Link to = "/discover">
            Discover
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to = "/minter">
            Minter
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to = "/mynfts">
            My NFTs
            </Link>
          </button>
        </div>
      </header>
    </div>
    <Switch>
  
    <Route path ="/discover">
      <h1> discover</h1>
    </Route>
    <Route path="/minter">
      <Minter/>
    </Route>
    <Route path="/mynfts">
      {userownedGallary}
    </Route>
    <Route exact path="/">
    <img className="bottom-space" src={homeImage} />
    </Route>
    </Switch>
 </BrowserRouter> );
}

export default Header;
