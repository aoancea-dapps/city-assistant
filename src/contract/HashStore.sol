pragma solidity ^0.4.11;

contract HashStore {

    mapping(address => string) private profiles;


    struct Hash {
        address sender;
        string content;
        uint timestamp;
    }

    mapping(uint => Hash) public hashes;

    uint public lastHashId;

    constructor() public {
        lastHashId = 0;
    }

    function save(string content) public {
        uint hashId = ++lastHashId;
        hashes[hashId].sender = msg.sender;
        hashes[hashId].content = content;
        hashes[hashId].timestamp = block.timestamp;
    }

    function find(uint _hashId) view public returns (address hashSender, string hashContent, uint hashTimestamp) {
        return (hashes[_hashId].sender, hashes[_hashId].content, hashes[_hashId].timestamp);
    }

    function post_update(uint hashId, string content) public {
        Hash storage hash = hashes[hashId];

        require(hash.sender == msg.sender);

        hash.content = content;
        hash.timestamp = block.timestamp;
    }





    function profile_save(string profile_hash) public {
        profiles[msg.sender] = profile_hash;
    }

    function profile_get(address owner) view public returns (string profile_hash) {
        return (profiles[owner]);
    }
}