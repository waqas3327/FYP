import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';
import { LoaderService } from '../sdk/custom/loader.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
createdAt;
  message: string = '';
  messages =  [];
  sub: any;
  queryParameters;
  channel: any;
  clientemailrecieved: any;
  useremailrecieved: any;
  modifiedstring: any;
  reversedString: any;
  nameToBeDisplayed: any;
  
  constructor(private userService: UserService,
    public db: AngularFireDatabase,private route: ActivatedRoute,private loaderservice: LoaderService
  ) {
    this.loaderservice.showHideAutoLoader();
    this.ngOnInit();
    this.db.list(`/channels/${this.channel}`).valueChanges().subscribe( data =>{
      console.log('ya channel',this.channel);
      this.messages = data;
      console.log('messages han bhai',this.messages);

    });
  }
  sendMessage() {
    try {   
      this.userService.SaveChannels(this.channel).subscribe(
         async data => {
          console.log('got response from server', data);
        },
        error => {
          console.log('error', error);
          console.log('Problem posting data!');
        }
      );
      } catch (ex) {
          console.log('ex', ex);
        }

    this.db.list(`/channels/${this.channel}`).push({
      sender: this.useremailrecieved,
      message: this.message,
      createdAt: new Date().getTime(),
    }).then( () => {
      // message is sent
    }).catch( () => {
      // some error. maybe firebase is unreachable
    });
    this.message = '';
     
  }


  // ionViewDidLoad() {
  //   this.db.list(`/channels/${this.channel}`).push({
  //     specialMessage: true,
  //     message: `${this.useremailrecieved} has joined the conversation`
  //   });
  // }

  // ionViewWillLeave(){
  //   this.db.list(`/channels/${this.channel}`).push({
  //     specialMessage: true,
  //     message: `${this.useremailrecieved} has left the conversation`
  //   });
  // }

listenerFirebase(){
  this.db.list(`/channels/${this.channel}`).valueChanges().subscribe( data =>{
    console.log('ya channel',this.channel);
    this.messages = data;
  
  });
}

  ngOnInit() {
    console.log('inside ngoninit');
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      this.queryParameters = +params['page'] || 0;
      console.log('inside ngoninit thora nicahy');
      this.useremailrecieved=params.useremail;
      this.clientemailrecieved=params.clientemail;      
      this.modifiedstring = this.useremailrecieved + "-" + this.clientemailrecieved; //example sami-adil
      this.reversedString = this.clientemailrecieved + "-" + this.useremailrecieved; //example adil-sami
      this.channel = this.reversedString; //reversed adil-sami
      this.db.list(`/channels/${this.channel}`).valueChanges().subscribe(value=>{
         console.log('value',value.length) // check whether channel(adil-sami) exists or not      
         //if adil-sami donot exists than use this channel
         if(value.length === 0 || value === undefined){
        console.log('inside if');
        this.channel = this.modifiedstring;
        this.nameToBeDisplayed = this.modifiedstring.substring(this.modifiedstring.indexOf("-") + 1);
        this.listenerFirebase();
      }
        //otherwise use smai-adil channel create new channel
        else{
        console.log('inside else');
        this.channel = this.reversedString;
        this.nameToBeDisplayed = this.reversedString.substring(0, this.reversedString.indexOf("-"));
        this.listenerFirebase();
      }  
      });     
    });
     
  }
}
