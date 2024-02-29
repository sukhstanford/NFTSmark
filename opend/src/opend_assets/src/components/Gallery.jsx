import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from "@dfinity/principal";

function Gallery(props) {
  const hostname = window.location.host;
 const fullhostname = "http://" + hostname + "/";
 const NFTID = props.ids;

 const [items, setItems] = useState();

 function fetchnfts() {
  if (props.ids != undefined) {
    return setItems(
      props.ids.map((NFTID) => (<Item id={NFTID} hostname={fullhostname} key={NFTID.toText()} />) 
    ));
  }
 };

 
useEffect(()=>{
 fetchnfts();
},[]);

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
        {items} </div>  
        </div>
      </div>
    </div>
  );
}

export default Gallery;
