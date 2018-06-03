import { Component, OnInit, Self } from '@angular/core';

import { IpfsService } from '../services/ipfs.service';

import { Post } from './post.model';
import { promise } from 'protractor';


import { HashStoreContract } from '../contracts/hash-store.contract';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    posts: Post[] = [];

    constructor(
        private hashStoreContract: HashStoreContract,
        private ipfsService: IpfsService) { }

    async ngOnInit() {
        var hashId: number = await this.load_hash_id();

        var posts: Post[] = await this.load_posts(hashId);

        this.posts = posts;
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

            self.hashStoreContract.instance.lastHashId(function (err, result) {

                var lastHashId: number = result['c'][0];

                resolve(lastHashId);
            });
        });

        return promise;
    }

    async find_hash(hashId: number): Promise<string> {
        var self = this;

        const promise = new Promise<string>((resolve, reject) => {

            self.hashStoreContract.instance.find(hashId, function (err, hashStore) {

                var hash: string = hashStore[1];

                resolve(hash);
            });
        });

        return promise;
    }
}