import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  sub: any;
  queryParameters: number;
  uniqueID: any;

  lostproductsData;
  foundproductsData;
  lostpeopleData;
  foundpeopleData;

  constructor(private route: ActivatedRoute, private userservice: UserService) { }

  ngOnInit() {
    //getting data from query params
    this.sub = this.route
  .queryParams
  .subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.queryParameters = +params['page'] || 0;
    this.uniqueID=params.markerID;
    console.log('ID:',this.uniqueID);
  });   
//get lost product description
console.log('iddddd= ', this.uniqueID);
this.userservice.getSingleLostProduct(this.uniqueID).subscribe(
  alllostproducts => {
    console.log("1st record  products", alllostproducts.data);
    this.lostproductsData = alllostproducts;
  },
  err => {
    console.log("api error in all request retrieval", err);
  }
);
}

dataprinter(){
   console.log('data:',this.lostproductsData.data.lat);
   console.log('data:',this.lostproductsData.data.lng);
   console.log('data:',this.lostproductsData.data.title);
   console.log('data:',this.lostproductsData.data.description);
   console.log('data:',this.lostproductsData.data.imageUrl);
   console.log('data:',this.lostproductsData.data.reward);
}

}