import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { IpfsService } from '../services/ipfs.service';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

    public title: string = '';
    public content: string = '';

    private hashStoreInstance: any;

    constructor(
        private web3Provider: Web3ProviderService,
        private ipfsService: IpfsService) {
    }

    ngOnInit() {
        var HashStoreABI = [{ "constant": false, "inputs": [{ "name": "content", "type": "string" }], "name": "save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "_hashId", "type": "uint256" }], "name": "find", "outputs": [{ "name": "hashSender", "type": "address" }, { "name": "hashContent", "type": "string" }, { "name": "hashTimestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "hashes", "outputs": [{ "name": "sender", "type": "address" }, { "name": "content", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

        var HashStoreContract = this.web3Provider.web3.eth.contract(HashStoreABI);

        this.hashStoreInstance = HashStoreContract.at('0xc6abe135d67fe7e86eae72658d6c9e33f949a9d5');
    }

    submit(): void {
        var self = this;

        let data = { title: this.title, content: this.content };

        this.ipfsService.ipfs.addJSON(data, (err, hash) => {

            if (err)
                console.log(err);

            console.log("Saved to IPFS", data);
            console.log("IPFS hash:", hash);

            self.hashStoreInstance.save(hash, {gas : 100}, function (err, bidResult) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('hash saved in blockchain!');
                }
            });
        });
    }
}