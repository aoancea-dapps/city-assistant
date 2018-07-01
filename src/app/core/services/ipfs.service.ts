import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

declare var IPFS: any;

@Injectable()
export class IpfsService {

    public ipfs: any;

    constructor() {
        if (environment.production) {
            this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        } else {
            this.ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });
        }
    }
}
