import { Injectable } from '@angular/core';

declare var IPFS: any;

@Injectable()
export class IpfsService {

    public ipfs: any;

    constructor() {
        this.ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });

        //this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    }
}
