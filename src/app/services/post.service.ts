import { Injectable } from '@angular/core';


import { HashStoreContract } from '../contracts/hash-store.contract';

@Injectable({
    providedIn: 'root'
})

export class PostService {

    constructor(
        private hashStoreContract: HashStoreContract,
    ) { }



    up_vote(id: number) {
        this.hashStoreContract.instance.post_vote(id, 1, function (err, result) {
            // fire and forget => this should work
        });
    }

    down_vote(id: number) {
        this.hashStoreContract.instance.post_vote(id, -1, function (err, result) {
            // fire and forget => this should work
        });
    }
}
