import { Injectable } from '@angular/core';

declare var Web3: any;
//declare var web3: any;

@Injectable()
export class Web3ProviderService {

    public web3: any;
    public isMetaMask: boolean;

    constructor() {
        //this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

        try {
            if (Web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                this.web3 = new Web3(Web3.currentProvider);
                this.isMetaMask = true;
            } else {
                // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
                this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
                this.isMetaMask = false;
            }
        } catch {
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
            this.isMetaMask = false;
        }
    }
}