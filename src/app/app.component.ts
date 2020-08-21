import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
name;
userexist = false;
public appPages = [
    // {
    //   title: 'Login',
    //   url: '/home',
    //   icon: 'home'
    // },
    // {
    //   title: 'Register',
    //   url: '/register',
    //   icon: 'create'
    // },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'people'
    },
    {
      title: 'My Posts',
      url: '/myposts',
      icon: 'bookmarks'
    },
    // {
    //   title: 'GeoLocation',
    //   url: '/geolocation',
    //   icon: 'locate'
    // },
    
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    },
    {
      title: 'Chats',
      url: '/openchat',
      icon: 'chatbubbles'
    },
    {
      title: 'Log Out',
      icon: 'log-out',
    }
  ];
constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router
  ) {
    this.initializeApp();
    this.backbutton();
  }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  }
initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
ngDoCheck() {
    this.name = localStorage.getItem('name');
    
    if(!this.name){
      this.userexist = true;
    }
    else{
      this.userexist = false;
    }
    
  }
  ngOnInit() {
    this.name = localStorage.getItem('name');
    
    if(!this.name){
      console.log('name',this.name)
      this.userexist = true;
    }
    else{
      this.userexist = false;
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface

  ngOnDestroy() {
    localStorage.removeItem('name');
    this.userexist = false;
  }
  
  logout(){
    alert('logged out succesfully!');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.userexist = false;
    this.router.navigate(['geolocation']);    
  }
}
