import { Component, OnInit } from '@angular/core';

declare var IpfsApi: any;


@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

    public title: string = '';
    public content: string = '';

    public ipfs: any;



    constructor() { }

    ngOnInit() {

        this.ipfs = IpfsApi('localhost', '5001');
    }
}
