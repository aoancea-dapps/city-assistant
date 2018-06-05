import { Component, OnInit, Self } from '@angular/core';

import { IpfsService } from '../services/ipfs.service';

import { Post, HashStore } from './post.model';
import { promise } from 'protractor';


import { HashStoreContract } from '../contracts/hash-store.contract';
import { Profile } from '../profile/profile.model';

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

                var hash_store: HashStore = await self.find_hash(hashId);

                var post: Post = await self.load_post_ipfs(hash_store.hash);
                post.id = hashId;

                var profile_hash_id: string = await self.get_profile_hash_id(hash_store.owner);
                var profile: Profile = await self.get_profile_ipfs(profile_hash_id);

                post.owner_name = profile.name;

                if (profile.name)
                    post.owner_name = profile.name;
                else
                    post.owner_name = 'johndoe';

                if (profile.image_url)
                    post.owner_image_url = profile.image_url;
                else
                    post.owner_image_url = 'https://randomuser.me/api/portraits/men/73.jpg';

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

    async find_hash(hashId: number): Promise<HashStore> {
        var self = this;

        const promise = new Promise<HashStore>((resolve, reject) => {

            self.hashStoreContract.instance.find(hashId, function (err, hashStore) {

                var hash: HashStore = new HashStore();
                hash.owner = hashStore[0];
                hash.hash = hashStore[1];

                resolve(hash);
            });
        });

        return promise;
    }

    async get_profile_hash_id(address: string): Promise<string> {
        var self = this;

        const promise = new Promise<string>((resolve, reject) => {

            self.hashStoreContract.instance.profile_get(address, function (err, result) {

                var profile_hash_id: string = result;

                resolve(profile_hash_id);
            });
        });

        return promise;
    }

    async get_profile_ipfs(profile_hash_id: string): Promise<Profile> {
        var self = this;

        const promise = new Promise<Profile>((resolve, reject) => {

            self.ipfsService.ipfs.catJSON(profile_hash_id, function (err, ipfsProfile) {

                const profile = new Profile();
                profile.name = ipfsProfile.name;
                profile.username = ipfsProfile.username;
                profile.image_url = ipfsProfile.image_url;

                resolve(profile);
            });
        });

        return promise;
    }
}
