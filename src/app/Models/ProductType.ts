import {Unit} from './Unit'
import { from } from "rxjs";

export class ProductType{

    id:number = 0;

    name:string = '';

    imageUrl:string = '';

    expirationTerm:number = 0;

    openedExpirationTerm:number = 0;

    isFavorite:boolean = false;

    description:string;

    tags:string[] = [];

    unit:Unit =  new Unit();

    unitClietId:number = 0 ;
}