 class LocalStorage {
  
    constructor() { }
    
    public SetToken(token:string){
        localStorage.setItem("tokens",token);
    }

    public GetTokens() {
       return localStorage.getItem("tokens");
    }

 }