 export class LocalStorage {
  
    constructor() { }
    
    public setToken(token:string) : void {
        localStorage.setItem("token",token);
    }

    public getToken() {
       return localStorage.getItem("token");
    }

 }