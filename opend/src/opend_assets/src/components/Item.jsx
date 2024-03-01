import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor , HttpAgent} from "@dfinity/agent"
import { idlFactory } from "../../../declarations/nft";
import {Principal} from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";

function Item(props) {
  const [name, setname] = useState();
  const [image, setimage] =useState(); 
  const [owner , setowner] = useState();
  const [button, setButton] =useState();
  const [priceinput, setprice] =useState();
  const [loaderHidden,setloaderHidden] = useState(true);
  const [blur, setblur]=useState();
 const [sellstatus,setsellstatus]=useState("");
  const id = props.id; 
  //console.log(id);

  const loaclHost = props.hostname; //"http://localhost:8080/";
  
  const agent = new HttpAgent({ host : loaclHost});
  // remove the line when deploying live
  agent.fetchRootKey();
  /////////////
  let  NFTActor;
  async function loadnft() {
     NFTActor = await Actor.createActor(idlFactory,{
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
    //console.log(owner);
    const ownername = owner.toText();

    setowner(ownername);
    const nftisLited = await opend.isListed(props.id);
   // console.log(typeof(props.id));
    if(nftisLited){
      setowner("SMARK");
      setblur({filter:"blur(4px)"});
      setsellstatus("listed")
    }else{

    setButton(<Button  handleClick={handleSell} text={"Sell"}/>)
    }
  };
  

  useEffect(() =>{
    loadnft();
  },[]);
   let price;
  function handleSell(){
   console.log("sell button clicked ");
   setprice(<input
    placeholder="Price in SANG"
    type="number"
    className="price-input"
    value={price}
    onChange={(e) => price =e.target.value}
  />);
  setButton(<Button  handleClick={sellItem} text={"Confirm"}/>)
  }

  async function sellItem(){

    setblur({filter:"blur(4px)"});
    setloaderHidden(false);
  console.log("item sold for")
  console.log(price)
  const listingResult = await opend.listItem( props.id, Number(price));
  console.log("listing:"+listingResult);
  if (listingResult == "Success" ) {
    const opendID = await opend.opendCanisterID();
   const transferResult = await NFTActor.transferOwnerShip(opendID);
   console.log("transfer :"+transferResult);
   
   if ( transferResult == "Success") {
    setloaderHidden(true);
    setprice();
    setButton();
    setowner("SMARK");
    setsellstatus("listed");
   }
  }
  };
  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderHidden}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
        <div  className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
          {name}
          <span className="purple-text"> {sellstatus}</span>
        
         </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceinput}
            {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
