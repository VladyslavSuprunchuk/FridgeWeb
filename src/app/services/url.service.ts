import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor() { }

    getCurrentUrl() {       
        return window.location.href;
    }
}