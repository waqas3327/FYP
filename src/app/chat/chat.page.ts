import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';



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
  username: any;
existence = false;

  constructor(
    public db: AngularFireDatabase,private route: ActivatedRoute
  ) {
this.ngOnInit();
    this.db.list(`/channels/${this.channel}`).valueChanges().subscribe( data =>{
      console.log('ya channel',this.channel);
      this.messages = data;
      console.log('messages han bhai',this.messages);

    });
  }
  sendMessage() {
    
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
  //     message: `${this.useremailrecieved} has joined the room`
  //   });
  // }

  // ionViewWillLeave(){
  //   this.db.list(`/channels/${this.channel}`).push({
  //     specialMessage: true,
  //     message: `${this.username} has left the room`
  //   });
  // }
listenerFirebase(){
  this.db.list(`/channels/${this.channel}`).valueChanges().subscribe( data =>{
    console.log('ya channel',this.channel);
    this.messages = data;

  });
}

checkexistence(reversedString){

return true;
}


  ngOnInit() {
    console.log('inside ngoninit');
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.queryParameters = +params['page'] || 0;
      console.log('inside ngoninit thora nicahy');
      this.useremailrecieved=params.useremail;
      this.clientemailrecieved=params.clientemail;
      console.log('email params:',this.useremailrecieved);
    
      this.modifiedstring = this.useremailrecieved + "-" + this.clientemailrecieved;
      const reversedString = this.clientemailrecieved + "-" + this.useremailrecieved;
      if(this.checkexistence(reversedString) == true){
        this.channel = reversedString;
      }
      else{
        this.channel = this.modifiedstring;
      }
     
  this.listenerFirebase();
    }); 
  }
}
