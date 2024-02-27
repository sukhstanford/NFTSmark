import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor ,HttpAgent} from "@dfinity/agent"
import { idlFactory } from "../../../declarations/nft";
import {Principal} from "@dfinity/principal";
function Item(props) {
  const [name, setname] = useState();
  const [image, setimage] =useState(); 
  const [owner , setowner] = useState();
  const id = Principal.fromText(props.id); 

  const loaclHost = "http://localhost:8081/";
  const agent = new HttpAgent({ host : loaclHost});

  async function loadnft() {
    const NFTActor = await Actor.createActor(idlFactory,{
      agent,
      canisterId:id,
    });

    const name = await NFTActor.getName();
     
    setname(name);
    const img = await NFTActor.getAsset();
   const img1 = new Uint8Array(img);
   const image = URL.createObjectURL(new Blob([img1.buffer],{type:"image/png"}));
    setimage(image);

    const owner = await NFTActor.getOwner();

    const ownername = owner.toText();

    setowner(ownername);
  };
  

  useEffect(() =>{
    loadnft();
  },[]);
  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
          <span className="purple-text"></span>
         {name}
         </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
