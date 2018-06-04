import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';

import { Web3ProviderService } from '../services/web3-provider.service';
import { IpfsService } from '../services/ipfs.service';

import { HashStoreContract } from '../contracts/hash-store.contract';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

    public title: string = '';
    public content: string = '';

    constructor(
        private hashStoreContract: HashStoreContract,
        private ipfsService: IpfsService,
        private router: Router,
        private ngZone: NgZone) {
    }

    ngOnInit() {

    }

    submit(): void {
        var self = this;

        let data = { title: this.title, content: this.content };

        this.ipfsService.ipfs.addJSON(data, (err, post_has_id) => {

            if (err)
                console.log(err);

            console.log("Saved to IPFS", data);
            console.log("IPFS hash:", post_has_id);

            self.hashStoreContract.instance.save(post_has_id, { gas: 300000 }, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('hash saved in blockchain!');

                    self.ngZone.run(() => {
                        self.router.navigate(['/home']);
                    });
                }
            });
        });
    }
}
