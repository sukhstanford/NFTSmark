import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

import  NFTActorClass "../NFT/nft";


actor OpenD {
   // creating data type in motoko 
   private type Listing ={ 
      itemOwner: Principal;
      itemPrice: Nat;
   };
 var mapofNFTs = HashMap.HashMap<Principal,NFTActorClass.NFT>(1,Principal.equal,Principal.hash);
 var mapofOwners =HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);
 var mapofListings= HashMap.HashMap<Principal,Listing>(1,Principal.equal,Principal.hash);
 
 
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

 public shared(msg) func listItem(id: Principal, price: Nat) : async Text {
   var item : NFTActorClass.NFT = switch (mapofNFTs.get(id)) {
      case(null) {return ( "NFT Does Not Exit.")  };
      case(?result) result;
   };
   let owner = await item.getOwner();
   // it check if person is the real owner of the nfts
   Debug.print(debug_show(owner));
    Debug.print(debug_show(msg.caller));
     Debug.print(debug_show(price));
   if (Principal.equal(owner, msg.caller)) {
      let newListing : Listing ={
         itemOwner = owner;
         itemPrice = price;
      };
      mapofListings.put(id, newListing);
      return "Success";
   }else{
      return "You dont own the NFT."
   }
   
 };
 public query func opendCanisterID() : async Principal{
   return Principal.fromActor(OpenD); 
 };
 public query func isListed(id : Principal) : async Bool {
   if (mapofListings.get(id) == null){
      return  false;
   }else{
      return true;
   }
 };
};
