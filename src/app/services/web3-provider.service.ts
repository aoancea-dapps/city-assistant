import { Injectable } from '@angular/core';

declare var Web3: any;
declare var window: any;

@Injectable()
export class Web3ProviderService {

    public web3: any;
    public isMetaMask: boolean;

    constructor() {
        try {
            if (Web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                this.web3 = new Web3(window.web3.currentProvider);
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
        } finally {
            this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        }
    }
}