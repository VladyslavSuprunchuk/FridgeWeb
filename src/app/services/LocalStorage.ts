 export class LocalStorage {
  
    constructor() { }
    
    public setToken(token:string){
        localStorage.setItem("tokens",token);
    }

    public getTokens() {
       return localStorage.getItem("tokens");
    }

 }