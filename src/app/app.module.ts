import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';

import { Web3ProviderService } from './services/web3-provider.service';
import { IpfsService } from './services/ipfs.service';

const routes = [
    { path: 'home', component: HomeComponent },
    { path: 'new-post', component: NewPostComponent },

    { path: '', redirectTo: '/home', pathMatch: "full" }
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NewPostComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
    providers: [Web3ProviderService, IpfsService],
    bootstrap: [AppComponent]
})

export class AppModule { }