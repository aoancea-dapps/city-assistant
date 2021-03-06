import { Injectable } from '@angular/core';

import { Web3ProviderService } from '../core/services/web3-provider.service';

import { environment } from '../../environments/environment';

@Injectable()
export class HashStoreContract {

    public instance: any;

    constructor(private web3Provider: Web3ProviderService) {

        var HashStoreABI = [ { "constant": false, "inputs": [ { "name": "hashId", "type": "uint256" }, { "name": "content", "type": "string" } ], "name": "post_update", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "hashId", "type": "uint256" }, { "name": "vote", "type": "int256" } ], "name": "post_vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "profile_hash", "type": "string" } ], "name": "profile_save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "content", "type": "string" } ], "name": "save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_hashId", "type": "uint256" } ], "name": "find", "outputs": [ { "name": "hashSender", "type": "address" }, { "name": "hashContent", "type": "string" }, { "name": "hashTimestamp", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "hashes", "outputs": [ { "name": "sender", "type": "address" }, { "name": "content", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashId", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" } ], "name": "profile_get", "outputs": [ { "name": "profile_hash", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "votes", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

        var HashStoreContract = this.web3Provider.web3.eth.contract(HashStoreABI);

        if (this.web3Provider.isMetaMask) {
            this.instance = HashStoreContract.at(environment.hash_store_contract_address_ropsten);
        } else {
            this.instance = HashStoreContract.at(environment.hash_store_contract_address_local);
        }
    }
}