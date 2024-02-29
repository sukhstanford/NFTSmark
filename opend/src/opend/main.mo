import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import  NFTActorClass "../NFT/nft";

actor OpenD {
 
 public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal{
    let owner : Principal = msg.caller;
    Debug.print(debug_show(Cycles.balance()));
    Cycles.add(100_500_000_000);// to add cycles to ur canister so that upload can work 
    Debug.print(debug_show(Cycles.balance()));
    let newNFT = await NFTActorClass.NFT(name, owner, imgData);
    let newNFTPrincipal =await newNFT.getCanisterID();
    return newNFTPrincipal;
 };
};
