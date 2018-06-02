pragma solidity ^0.4.11;

contract HashStore {

  struct Hash {
    address sender;
    string content;
    uint timestamp;
  }

  mapping(uint => Hash) public hashes;

  uint public lastHashId;

  function HashStore() public {
    lastHashId = 0;
  }

  function save(string content) public {
    uint hashId = ++lastHashId;
    hashes[hashId].sender = msg.sender;
    hashes[hashId].content = content;
    hashes[hashId].timestamp = block.timestamp;
  }

  function find(uint _hashId) constant public returns (address hashSender, string hashContent, uint hashTimestamp) {
    return (hashes[_hashId].sender, hashes[_hashId].content, hashes[_hashId].timestamp);
  }
}