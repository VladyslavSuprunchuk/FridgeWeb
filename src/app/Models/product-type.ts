import {Unit} from './unit'

export class ProductType{

    id:number = 0;

    name:string = '';

    imageUrl:string = '';

    expirationTerm:number = 0;

    openedExpirationTerm:number = 0;

    isFavorite:boolean = false;

    description:string;

    tags:string[] = [];

    unit:Unit = new Unit();

    unitId:number = 0 ;
}