import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectConfig } from '../project.config';

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
  public PostLostProduct(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/product/PostLostProduct';

    return this.http.post(url, credentials);
  }

  public PostLostPerson(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/person/PostLostPerson';

    return this.http.post(url, credentials);
  }

  public uploadAvatar(
    user_info: any,
    image: any,
    user_id: any
  ): Observable<any> {
    const url = ProjectConfig.getPath() + `/user/avatar/${user_id}`;

    const file_location = `avatar-${user_id}.${user_info.extension}`;
    const formData: FormData = new FormData();
    formData.append('file', image, file_location);

    return this.http
      .put(url, formData, {
      })
  }

}
