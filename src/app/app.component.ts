import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from './services/web3-provider.service';
import { IpfsService } from './services/ipfs.service';

import { HashStoreContract } from './contracts/hash-store.contract';

import { Profile } from './profile/profile.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    public profile: Profile = new Profile();

    constructor(
        private hashStoreContract: HashStoreContract,
        private ipfsService: IpfsService) {
    }

    async ngOnInit() {
        var profile_hash_id: string = await this.get_profile_hash_id();

        if (profile_hash_id) {
            this.profile = await this.get_profile_ipfs(profile_hash_id);
        } else {
            this.profile.name = 'Bruce Wayne';
            this.profile.image_url = 'http://grafreez.com/wp-content/temp_demos/river/img/admin-bg.jpg';
        }
    }

    async get_profile_hash_id(): Promise<string> {
        var self = this;

        const promise = new Promise<string>((resolve, reject) => {

            self.hashStoreContract.instance.profile_get(function (err, result) {

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
