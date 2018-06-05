pragma solidity ^0.4.16;

contract HashStore {

    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    // 18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply;


    mapping(address => string) private profiles;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;


    struct Hash {
        address sender;
        string content;
        uint timestamp;
    }

    mapping(uint => Hash) public hashes;
    mapping(uint => uint) public votes;

    uint public lastHashId;


    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor (uint256 initialSupply) public {
        lastHashId = 0;

        // Token setup
        totalSupply = initialSupply * 100;                      // Update total supply with the decimal amount
        balanceOf[msg.sender] = initialSupply;                  // Give the creator all initial tokens
        name = "City Assistant Token";                          // Set the name for display purposes
        symbol = "CAT";                                         // Set the symbol for display purposes
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);           // Check if the sender has enough
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        balanceOf[msg.sender] -= _value;                    // Subtract from the sender
        balanceOf[_to] += _value;                           // Add the same to the recipient
    }



    
    /* Posts */
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

    function post_vote(uint hashId) public {
        votes[hashId]++;
    }




    /* Profile */
    function profile_save(string profile_hash) public {
        profiles[msg.sender] = profile_hash;
        balanceOf[msg.sender] += 10;                        // Potential security issue: Currently allowed by a user to add funds to his account
    }

    function profile_get(address owner) view public returns (string profile_hash) {
        return (profiles[owner]);
    }
}
