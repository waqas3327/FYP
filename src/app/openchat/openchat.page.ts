import { Component, OnInit } from '@angular/core';
import { UserService } from '../sdk/custom/user.service';
import { Router } from '@angular/router';
import { LoaderService } from '../sdk/custom/loader.service';
import { AlertService } from '../sdk/custom/alert.service';
@Component({
  selector: 'app-openchat',
  templateUrl: './openchat.page.html',
  styleUrls: ['./openchat.page.scss'],
})
export class OpenchatPage implements OnInit {
  allChannelsRetrieved=[];
  userloggedin: any;
  startmodified: any;
  endmodified: any;
  user: any;
spinner = true;
  newchannel=[];
  count=0;
  constructor(private userService: UserService,private router: Router,
    private loaderservice: LoaderService,private alertservice: AlertService) {
      this.loaderservice.showLoader();
     }

  // str = str.substring(str.indexOf(":") + 1);

  ngOnInit() {
    this.userloggedin = localStorage.getItem('name');
    this.user = this.userloggedin.substring(0, this.userloggedin.indexOf("@"));
    //retrieving channels
    this.userService.GetAllChannels().subscribe(
      allchannels => {
        for (let i = 0;i<allchannels.length;i++){
          this.startmodified = allchannels[i].name.substring(0, allchannels[i].name.indexOf("-"));
          this.endmodified = allchannels[i].name.substring(allchannels[i].name.indexOf("-") + 1);
          if(this.startmodified === this.user){
            this.allChannelsRetrieved[i] = allchannels[i].name.substring(allchannels[i].name.indexOf("-") + 1);
         }
        else if( this.endmodified === this.user){
           this.allChannelsRetrieved[i] =allchannels[i].name.substring(0, allchannels[i].name.indexOf("-"));
         }
         else{
           this.allChannelsRetrieved[i] = "a";
         }
      }
      
         this.loaderservice.hideLoader();
      },
      err => {

        this.alertservice.presentAlertConfirm("Server Down! Please retry","Error!");
        this.loaderservice.hideLoader();
      }
    );
  }//end of ngOnInit();

//   console.log('item',allchannels[0].name);
//   console.log('all channels:',allchannels);
  
//   for (let item of allchannels)
//     {
//       console.log('inside looop');
//       if (item.name.includes(this.user)){
//       this.allChannelsRetrieved.push(item.name);
//     }
//  }



  

  openChat(item){
  this.router.navigate(['/chat'], { queryParams: { useremail: this.user, clientemail: item } });
}




}
