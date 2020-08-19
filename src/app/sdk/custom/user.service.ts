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

  //getting single user
public getSingleUser(email: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/user/getsingleuser/' + email;
  return this.http.get(url);
}

//update user
public UpdateUser(credentials: object, email: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/user/updateuser/' + email;

  return this.http.put(url, credentials);
}
public UpdateRating(credentials: object, email: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/user/updaterating/' + email;

  return this.http.put(url, credentials);
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
//getting all lost products
public getAllLostProducts(): Observable<any> {
  const url = ProjectConfig.getPath() + '/product/getalllostproducts';
  //return this.http.get(url, credentials);
  return this.http.get(url);
}
//getting all found products
public getAllFoundProducts(): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundproduct/getallfoundproducts';
  //return this.http.get(url, credentials);
  return this.http.get(url);
}
//getting single found product
public getSingleFoundProduct(id: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/foundproduct/getsinglefoundproduct/' + id;
  return this.http.get(url);
}
//getting single lost product
public getSingleLostProduct(id: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/product/getsinglelostproduct/' + id;
  return this.http.get(url);
}


//getting single lost & found on the basis of email
//getting single found product
public getSingleFoundProductEmail(email: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/foundproduct/getsinglefoundproductemail/' + email;
  return this.http.get(url);
}
//getting single lost product
public getSingleLostProductEmail(email: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/product/getsinglelostproductemail/' + email;
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

//getting all found persons
public getAllFoundPersons(): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundperson/getallfoundpersons';
  //return this.http.get(url, credentials);
  return this.http.get(url);
}

//getting all lost persons
public getAllLostPersons(): Observable<any> {
  const url = ProjectConfig.getPath() + '/person/getalllostpersons';
  //return this.http.get(url, credentials);
  return this.http.get(url);
}
//getting single lost person
public getSingleLostPerson(id: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/person/getsinglelostperson/' + id;
  return this.http.get(url);
  //return this.http.get(url);
}
//getting single found person
public getSingleFoundPerson(id: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/foundperson/getsinglefoundperson/' + id;
  return this.http.get(url);
}

//getting single lost and found on the basis of email
public getSingleLostPersonEmail(email: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/person/getsinglelostpersonemail/' + email;
  return this.http.get(url);
  //return this.http.get(url);
}
public getSingleFoundPersonEmail(email: String): Observable<any>{
  const url = ProjectConfig.getPath() + '/foundperson/getsinglefoundpersonemail/' + email;
  return this.http.get(url);
}

//updating posts

public updateLostProductPost(credentials: object, _id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/product/updateLostProductPost/' + _id;

  return this.http.put(url, credentials);
}


public updateLostPersonPost(credentials: object, _id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/person/updateLostPersonPost/' + _id;

  return this.http.put(url, credentials);
}


public updateFoundProductPost(credentials: object, _id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundproduct/updateFoundProductPost/' + _id;

  return this.http.put(url, credentials);
}


public updateFoundPersonPost(credentials: object, _id: String): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundperson/updateFoundPersonPost/' + _id;

  return this.http.put(url, credentials);
}
//deleting posts
public deleteFoundPersonPost(_id: string): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundperson/deleteFoundPersonPost/' + _id;
  return this.http.delete(url);
}

public deleteFoundProductPost(_id: string): Observable<any> {
  const url = ProjectConfig.getPath() + '/foundproduct/deleteFoundProductPost/' + _id;
  return this.http.delete(url);
}

public deleteLostPersonPost(_id: string): Observable<any> {
  const url = ProjectConfig.getPath() + '/person/deleteLostPersonPost/' + _id;
  return this.http.delete(url);
}

public deleteLostProductPost(_id: string): Observable<any> {
  const url = ProjectConfig.getPath() + '/product/deleteLostProductPost/' + _id;
  return this.http.delete(url);
}

}
