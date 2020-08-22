import { Component, OnInit } from '@angular/core';
import { UserService } from '../sdk/custom/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-openchat',
  templateUrl: './openchat.page.html',
  styleUrls: ['./openchat.page.scss'],
})
export class OpenchatPage implements OnInit {
  allChannelsRetrieved = [];
  userloggedin: any;
  startmodified: any;
  endmodified: any;
  user: any;

  constructor(private userService: UserService,private router: Router) { }

  // str = str.substring(str.indexOf(":") + 1);

  ngOnInit() {
    this.userloggedin = localStorage.getItem('name');
    this.user = this.userloggedin.substring(0, this.userloggedin.indexOf("@"));
    //retrieving channels
    this.userService.GetAllChannels().subscribe(
      allchannels => {
        console.log("Channels retrieved", allchannels[0].name);
        //this.allChannelsRetrieved = allchannels;
        
      
        for (let i = 0;i<allchannels.length;i++){
             console.log('inside loop');
             this.startmodified = allchannels[i].name.substring(0, allchannels[i].name.indexOf("-"));
             this.endmodified = allchannels[i].name.substring(allchannels[i].name.indexOf("-") + 1);
             console.log('front',this.startmodified);
             console.log('back',this.endmodified);
             if(this.startmodified === this.user){
               this.allChannelsRetrieved[i] = allchannels[i].name.substring(allchannels[i].name.indexOf("-") + 1);
            }
            if( this.endmodified === this.user){
              this.allChannelsRetrieved[i] =allchannels[i].name.substring(0, allchannels[i].name.indexOf("-"));
            }
        }
      
      },
      err => {
        console.log("api error in all request retrieval", err);
      }
    );
  }//end of ngOnInit();

openChat(item){
  this.router.navigate(['/chat'], { queryParams: { useremail: this.user, clientemail: item } });
}



}
