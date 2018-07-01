import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';

import { Web3ProviderService } from '../core/services/web3-provider.service';
import { IpfsService } from '../core/services/ipfs.service';

import { HashStoreContract } from '../contracts/hash-store.contract';

import { Profile } from './profile.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public profile: Profile = new Profile();

    public balance: number;

    constructor(
        private hashStoreContract: HashStoreContract,
        private ipfsService: IpfsService,
        private router: Router,
        private ngZone: NgZone,
        private web3ProviderService: Web3ProviderService) {
    }

    // This information should be cached in local storage so we don't fetch it everywhere

    async ngOnInit() {

        var self = this;

        self.hashStoreContract.instance.balanceOf(self.web3ProviderService.web3.eth.defaultAccount, function (err, balance) {
            self.balance = balance['c'][0];
        });

        var profile_hash_id: string = await this.get_profile_hash_id();

        if (profile_hash_id) {
            var profile: Profile = await this.get_profile_ipfs(profile_hash_id);

            if (profile)
                this.profile = profile;
        }
    }

    save(): void {
        var self = this;

        self.ipfsService.ipfs.addJSON(self.profile, (err, new_profile_hash_id) => {

            if (err)
                console.log(err);

            console.log("Saved to IPFS", self.profile);
            console.log("IPFS hash:", new_profile_hash_id);

            self.hashStoreContract.instance.profile_save(new_profile_hash_id, { gas: 300000 }, function (err, res) {
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

    cancel(): void {
        this.router.navigate(['/home']);
    }

    async get_profile_hash_id(): Promise<string> {
        var self = this;

        const promise = new Promise<string>((resolve, reject) => {

            self.hashStoreContract.instance.profile_get(self.web3ProviderService.web3.eth.defaultAccount, function (err, result) {

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