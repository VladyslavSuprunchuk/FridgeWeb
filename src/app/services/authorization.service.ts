import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  get():string {
    return localStorage.getItem("token");
  }

  drop():void {
    localStorage.removeItem("token");
  }
  
}