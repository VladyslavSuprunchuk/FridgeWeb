import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from './../models/client'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  getToken():string {
    return localStorage.getItem("token");
  }

  dropToken():void {
    localStorage.removeItem("token");
  }
  
  getUserinfo():Client{
    return JSON.parse(localStorage.getItem("userInfo"));
  }
}