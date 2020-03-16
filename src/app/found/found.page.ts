import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  sub: any;
  queryParameters: number;
  uniqueID: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
  .queryParams
  .subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.queryParameters = +params['page'] || 0;
    this.uniqueID=params.markerID;
    console.log('ID:',this.uniqueID);
  }); 
  }

}
