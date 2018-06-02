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

    constructor(
        private web3Provider: Web3ProviderService,
        private ipfsService: IpfsService) {
    }

    ngOnInit() {

    }

    submit(): void {
        let data = { title: this.title, content: this.content };

        this.ipfsService.ipfs.addJSON(data, (err, hash) => {

            if (err)
                console.log(err);

            console.log("Saved to IPFS", data);
            console.log("IPFS hash:", hash);
        });
    }
}
