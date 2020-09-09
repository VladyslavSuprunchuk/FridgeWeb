import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { ParseSourceFile } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  private BASE_URL: string = "http://localhost:5000/api";

  constructor(private http: HttpClient, private router: Router, ) { }

  public getQuery<T>(url: string, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.get(queryURL, { headers: headers })
      .pipe(catchError(this.handleError<T>('getQuery')));
  }

  public postQuery<T>(url: string, object: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.post(queryURL, object, { headers: headers })
      .pipe(catchError(this.handleError<T>('postQuery')));
  }

  public putQuery<T>(url: string, object: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.put(queryURL, object, { headers: headers })
      .pipe(catchError(this.handleError<T>('putQuery')));
  }
  public postFormData<T>(url: string, data: any, file: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestFormData();
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('data', JSON.stringify(data));
    return this.http.post(queryURL, uploadData, { headers: headers })
      .pipe(catchError(this.handleError<T>('postFormData')));
  }

  public putFormData<T>(url: string, data: any, file: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestFormData();
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('data', JSON.stringify(data));
    return this.http.put(queryURL, uploadData, { headers: headers })
      .pipe(catchError(this.handleError<T>('putFormData')));
  }

  public deleteQuery<T>(url: string) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.delete(queryURL, { headers: headers })
      .pipe(catchError(this.handleError<T>('deleteQuery')));
  }

  private bindHeadersToRequestFormData(): HttpHeaders {
    let _headers = new HttpHeaders();
    _headers = _headers.set('Accept', 'application/json');
    _headers = _headers.append("Access-Control-Allow-Origin", "*");
    _headers = _headers.append("Access-Control-Allow-Methods", "POST, GET");
    _headers = _headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return _headers;
  }

  private bindHeadersToRequestModel(): HttpHeaders {
    let _headers = new HttpHeaders();
    _headers = _headers.set('Accept', 'application/json');
    _headers = _headers.append("Access-Control-Allow-Origin", "*");
    _headers = _headers.append("Access-Control-Allow-Methods", "POST, GET");
    _headers = _headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    _headers = _headers.append('Content-Type', 'application/json');
    return _headers;
  }

  private handleError<T>(operation = 'operation', result?) {
    return (error: any) => {

      if (error.status == 401) {
        this.router.navigate(['/login']);
      }

      result = error.error;
      (result.error.errorMessage);
      return of(result);
    };
  }
}
