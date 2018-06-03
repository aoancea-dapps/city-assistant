import { Component, OnInit, Self } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { IpfsService } from '../services/ipfs.service';

import { Post } from './post.model';
import { promise } from 'protractor';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    posts: Post[] = [];

    private hashStoreInstance: any;

    constructor(
        private web3Provider: Web3ProviderService,
        private ipfsService: IpfsService) { }

    async ngOnInit() {
        var self = this;

        self.web3Provider.web3.eth.defaultAccount = self.web3Provider.web3.eth.accounts[0];

        var HashStoreABI = [{ "constant": false, "inputs": [{ "name": "content", "type": "string" }], "name": "save", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [{ "name": "_hashId", "type": "uint256" }], "name": "find", "outputs": [{ "name": "hashSender", "type": "address" }, { "name": "hashContent", "type": "string" }, { "name": "hashTimestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "hashes", "outputs": [{ "name": "sender", "type": "address" }, { "name": "content", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

        var HashStoreContract = self.web3Provider.web3.eth.contract(HashStoreABI);

        //self.hashStoreInstance = HashStoreContract.at('0x0510ad11b347b84c0c7cd83b18af0a3147e76883');
        self.hashStoreInstance = HashStoreContract.at('0x18150663f29925e2ba7c8fbab55ebfc4c5e1606f');

        const postTemp = new Post();
        postTemp.id = 1;
        postTemp.hash = "";
        postTemp.title = "";
        postTemp.content = "";

        self.posts.push(postTemp);

        console.log(self.posts);

        // self.hashStoreInstance.lastHashId(function (err, result) {
        //     var lastHashId = result['c'][0];

        //     for (let hashId = 1; hashId <= lastHashId; hashId++) {

        //         self.hashStoreInstance.find(hashId, function (err, hashStore) {

        //             self.ipfsService.ipfs.catJSON(hashStore[1], function (err, ipfsPost) {

        //                 var post: Post = {
        //                     id: hashId,
        //                     hash: hashStore[1],
        //                     title: ipfsPost.title,
        //                     content: ipfsPost.content
        //                 };

        //                 self.posts.push(post);

        //                 console.log(self.posts);
        //             });
        //         });
        //     }
        // });


        //var lastHashId = await self.hashStoreInstance.lastHashId();

        // const promise = new Promise<Post[]>((resolve, reject) => {

        //     var posts: Post[] = [];

        //     self.hashStoreInstance.lastHashId(function (err, result) {
        //         var lastHashId = result['c'][0];

        //         for (let hashId = 1; hashId <= lastHashId; hashId++) {

        //             self.hashStoreInstance.find(hashId, function (err, hashStore) {

        //                 self.ipfsService.ipfs.catJSON(hashStore[1], function (err, ipfsPost) {

        //                     var post: Post = {
        //                         id: hashId,
        //                         hash: hashStore[1],
        //                         title: ipfsPost.title,
        //                         content: ipfsPost.content
        //                     };

        //                     posts.push(post);

        //                     console.log(posts);

        //                     resolve(posts);
        //                 });
        //             });
        //         }
        //     });
        // });

        // promise.then((res) => {
        //     self.posts = res;
        // });

        // var asyncPost: Post = await this.test();
        // self.posts.push(asyncPost);

        // this.test().then((res) => {
        //     self.posts.push(res);
        // });


        var hashId: number = await this.load_hash_id();

        console.log(hashId);

        var posts: Post[] = await this.load_posts(hashId);

        console.log(posts);

        this.posts = posts;
    }


    async test(): Promise<Post> {
        const promise = new Promise<Post>((resolve, reject) => {
            const postTemp = new Post();
            postTemp.id = 1;
            postTemp.hash = "";
            postTemp.title = "Async Post";
            postTemp.content = "Post from async/await inside typescript!";

            resolve(postTemp);
        });

        return promise;
    }


    async load_post_ipfs(hash: string): Promise<Post> {
        var self = this;

        const promise = new Promise<Post>((resolve, reject) => {

            self.ipfsService.ipfs.catJSON(hash, function (err, ipfsPost) {

                const post = new Post();
                post.hash = hash;
                post.title = ipfsPost.title;
                post.content = ipfsPost.content;

                resolve(post);
            });
        });

        return promise;
    }

    async load_posts(lastHashId): Promise<Post[]> {
        var self = this;

        const promise = new Promise<Post[]>(async (resolve, reject) => {
            var posts: Post[] = [];

            for (let hashId = 1; hashId <= lastHashId; hashId++) {

                var hash: string = await self.find_hash(hashId);

                var post: Post = await self.load_post_ipfs(hash);
                post.id = hashId;

                posts.push(post);
            }

            resolve(posts);
        });

        return promise;
    }

    async load_hash_id(): Promise<number> {
        var self = this;

        const promise = new Promise<number>((resolve, reject) => {

            self.hashStoreInstance.lastHashId(function (err, result) {

                var lastHashId: number = result['c'][0];

                resolve(lastHashId);
            });
        });

        return promise;
    }

    async find_hash(hashId: number): Promise<string> {
        var self = this;

        const promise = new Promise<string>((resolve, reject) => {

            self.hashStoreInstance.find(hashId, function (err, hashStore) {

                var hash: string = hashStore[1];

                resolve(hash);
            });
        });

        return promise;
    }
}