import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfileComponent } from './profile/profile.component';

import { Web3ProviderService } from './services/web3-provider.service';
import { IpfsService } from './services/ipfs.service';

import { HashStoreContract } from './contracts/hash-store.contract';

const routes = [
    { path: 'home', component: HomeComponent },
    { path: 'new-post', component: NewPostComponent },
    { path: 'profile', component: ProfileComponent },

    { path: '', redirectTo: '/home', pathMatch: "full" }
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NewPostComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule
    ],
    providers: [
        Web3ProviderService, IpfsService,
        HashStoreContract,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
