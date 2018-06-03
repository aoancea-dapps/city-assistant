import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { IpfsService } from '../services/ipfs.service';

import { Post } from './post.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public posts: Post[] = [];

    private hashStoreInstance: any;

    constructor(
        private web3Provider: Web3ProviderService,
        private ipfsService: IpfsService) { }

    ngOnInit() {
        var self = this;


        self.web3Provider.web3.eth.defaultAccount = self.web3Provider.web3.eth.accounts[0];

        var HashStoreABI = [{ "constant": false, "inputs": [{ "name": "content", "type": "string" }], "name": "save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "_hashId", "type": "uint256" }], "name": "find", "outputs": [{ "name": "hashSender", "type": "address" }, { "name": "hashContent", "type": "string" }, { "name": "hashTimestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "hashes", "outputs": [{ "name": "sender", "type": "address" }, { "name": "content", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

        var HashStoreContract = self.web3Provider.web3.eth.contract(HashStoreABI);

        self.hashStoreInstance = HashStoreContract.at('0x0510ad11b347b84c0c7cd83b18af0a3147e76883');

        self.hashStoreInstance.lastHashId(function (err, result) {
            var lastHashId = result['c'][0];

            for (let hashId = 1; hashId <= lastHashId; hashId++) {

                self.hashStoreInstance.find(hashId, function (err, hashStore) {

                    self.ipfsService.ipfs.catJSON(hashStore[1], function (err, ipfsPost) {

                        var post: Post = {
                            id: hashId,
                            hash: hashStore[1],
                            title: ipfsPost.title,
                            content: ipfsPost.content
                        };

                        self.posts.push(post);
                    });
                });
            }
        });
    }
}