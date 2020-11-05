import {Unit} from './unit'
import {Author} from './author'

export class ProductType{

    id:number = 0;

    name:string = '';

    imageUrl:string = '';

    expirationTerm:number = 0;

    openedExpirationTerm:number = 0;

    isFavorite:boolean = false;

    isHidden:boolean = false;

    userAuthor:Author = new Author();

    description:string;

    tags:string[] = [];

    unit:Unit = new Unit();

    unitId:number = 0 ;
}