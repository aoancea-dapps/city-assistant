import { Injectable } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';

@Injectable()
export class HashStoreContract {

    public instance: any;

    constructor(private web3Provider: Web3ProviderService) {

        var HashStoreABI = [{ "constant": false, "inputs": [{ "name": "content", "type": "string" }], "name": "save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "_hashId", "type": "uint256" }], "name": "find", "outputs": [{ "name": "hashSender", "type": "address" }, { "name": "hashContent", "type": "string" }, { "name": "hashTimestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "hashes", "outputs": [{ "name": "sender", "type": "address" }, { "name": "content", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

        var HashStoreContract = this.web3Provider.web3.eth.contract(HashStoreABI);

        this.instance = HashStoreContract.at('0x0510ad11b347b84c0c7cd83b18af0a3147e76883');
        //this.instance = HashStoreContract.at('0x18150663f29925e2ba7c8fbab55ebfc4c5e1606f');
    }
}