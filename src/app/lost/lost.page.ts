import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { ProjectConfig } from '../sdk/project.config';
@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  sub: any;
  queryParameters: number;
  uniqueID: any;
  markertype;

  dataretrieved;
  lostproductsData;
  title;
  description;
  imageurl;

  foundproductsData;
  lostpeopleData;
  foundpeopleData;
  youremail: any;

  user = {
    src: ''
  };


  constructor(private route: ActivatedRoute, private userservice: UserService) { }

  ngOnInit() {
    //getting data from query params
    this.sub = this.route
  .queryParams
  .subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.queryParameters = +params['page'] || 0;
    this.uniqueID=params.markerID;
    this.markertype = params.markertype;
    console.log('ID:',this.uniqueID);
    console.log('markerType: ',this.markertype);
  });   
  
  if(this.markertype === 'lostproduct')
  {
//get lost product description
this.userservice.getSingleLostProduct(this.uniqueID).subscribe(
  alllostproducts => {
    console.log("1st record  products", alllostproducts.data);
    this.dataretrieved = alllostproducts;
    this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
    console.log('imageurl:',this.user.src);
  },
  err => {
    console.log("api error in all request retrieval", err);
  }
);
}//end if
if(this.markertype === 'lostperson'){
this.userservice.getSingleLostPerson(this.uniqueID).subscribe(
  alllostproducts => {
    console.log("1st record  products", alllostproducts.data);
    this.dataretrieved = alllostproducts;
    this.user.src = ProjectConfig.getPath() + '/' + this.dataretrieved.data.imageUrl;
    console.log('imageurl:',this.user.src);
  },
  err => {
    console.log("api error in all request retrieval", err);
  }
);
}//end if
}
}