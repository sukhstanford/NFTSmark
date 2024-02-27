import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";


actor class NFT (name : Text, owner:Principal, content : [Nat8]) {
//Debug.print("it works!");

let itemName = name;
let nftOwner = owner;
let imageBytes = content;

public query func getName() : async Text{
    return itemName;
};

public query func getOwner() : async Principal{
    return nftOwner;
};
public query func getAsset() : async [Nat8] {
    return imageBytes;
};

};

