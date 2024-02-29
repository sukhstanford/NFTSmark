import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

import  NFTActorClass "../NFT/nft";


actor OpenD {
 var mapofNFTs = HashMap.HashMap<Principal,NFTActorClass.NFT>(1,Principal.equal,Principal.hash);
 var mapofOwners =HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);
 public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal{
    let owner : Principal = msg.caller;
    Debug.print(debug_show(Cycles.balance()));
    Cycles.add(100_500_000_000);// to add cycles to ur canister so that upload can work 
    Debug.print(debug_show(Cycles.balance()));
    let newNFT = await NFTActorClass.NFT(name, owner, imgData);
    let newNFTPrincipal =await newNFT.getCanisterID();
    
    mapofNFTs.put(newNFTPrincipal,newNFT);
    addToownershipMap(owner, newNFTPrincipal);

    return newNFTPrincipal;
 };

 private func addToownershipMap(owner: Principal, nftId : Principal){
   var ownedNFTs : List.List<Principal> = switch (mapofOwners.get(owner)) { // we use switch statement when we have ? data type on both side  
      case null List.nil<Principal>(); // this is way of writing empty [] in motoko 
      case(?result) result;   
   };
   ownedNFTs := List.push(nftId,ownedNFTs);
   mapofOwners.put(owner,ownedNFTs);
 };
 public query func getOwnedNFTs(user: Principal) : async [Principal] {
  var  listofowned : List.List<Principal> = switch (mapofOwners.get(user)){
   case null List.nil<Principal>();
   case(?result) result;
  }; 
  return List.toArray(listofowned);


 };
};
