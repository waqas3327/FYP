import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectConfig } from '../project.config';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { analyzeFile } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public userLogin(credentials: object): Observable<any> {

    const url = ProjectConfig.getPath() + '/user/login';

    return this.http.post(url, credentials);
  }
  public userRegister(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/user/register';

    return this.http.post(url, credentials);
  }
  public userForgotPassword(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/user/sendmail';


    return this.http.post(url, credentials);
  }

  //product
  public PostLostProduct(credentials: object, id: String): Observable<any> {
    const url = ProjectConfig.getPath() + '/product/updatePostLostProduct/' + id;
    return this.http.put(url, credentials);
  }
//found product
public PostfoundProduct(credentials: object, id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundproduct/updatePostfoundProduct/' + id;
  return this.http.put(url, credentials);
}
//getting all products
public getAllLostProducts(): Observable<any> {
  const url = ProjectConfig.getPath() + '/product/getalllostproducts';
  //return this.http.get(url, credentials);
  return this.http.get(url);
}




  public uploadAvatar(
    user_info: any,
    image: any,
    value: any,
    randomNumber:any
   // user_id: any
  ): Observable<any> {
    // /user/avatar/${user_id}
    var file_location;
    var url;  
    if(value == 'item'){
       url = ProjectConfig.getPath() + '/product/PostLostProduct';
       file_location = `lostproduct-${randomNumber}.${user_info.extension}`;  
    }
    if(value == 'person'){
       url = ProjectConfig.getPath() + '/person/PostLostPerson';
       file_location = `lostperson-${randomNumber}.${user_info.extension}`;
        
    }
    const formData: FormData = new FormData();
    formData.append('file', image, file_location);

    return this.http
      .post(url, formData, {
      })
  }



  public uploadAvatarfound(
    user_info: any,
    image: any,
    value: any,
    randomNumber:any
   // user_id: any
  ): Observable<any> {
    // /user/avatar/${user_id}
    var file_location;
    var url;  
    if(value == 'item'){
       url = ProjectConfig.getPath() + '/foundproduct/PostfoundProduct';
       file_location = `foundproduct-${randomNumber}.${user_info.extension}`;  
    }
    if(value == 'person'){
       url = ProjectConfig.getPath() + '/foundperson/PostfoundPerson';
       file_location = `foundperson-${randomNumber}.${user_info.extension}`;
        
    }
    const formData: FormData = new FormData();
    formData.append('file', image, file_location);

    return this.http
      .post(url, formData, {
      })
  }







  //person
  public PostLostPerson(credentials: object, id: String): Observable<any> {
    const url = ProjectConfig.getPath() + '/person/updatePostLostPerson/' + id;

    return this.http.put(url, credentials);
  }

//found person
public PostfoundPerson(credentials: object, id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundperson/updatePostfoundPerson/' + id;

  return this.http.put(url, credentials);
}



  // public uploadAvatarPerson(
  //   user_info: any,
  //   image: any,
  //   randomNumber:any
  //  // user_id: any
  // ): Observable<any> {
  //   // /user/avatar/${user_id}
  //   const url = ProjectConfig.getPath() + '/person/PostLostPerson/';

  //   const file_location = `lostperson-${randomNumber}.${user_info.extension}`;
  //   const formData: FormData = new FormData();
  //   formData.append('file', image, file_location);

  //   return this.http
  //     .post(url, formData, {
  //     })
  // }

}
