import {Unit} from './unit'
import {AuthorClient} from './authorClient'

export class ProductType{

    id:number = 0;

    name:string = '';

    imageUrl:string = '';

    expirationTerm:number = 0;

    openedExpirationTerm:number = 0;

    isFavorite:boolean = false;

    isHidden:boolean = false;

    userAuthor:AuthorClient = new AuthorClient();

    description:string;

    tags:string[] = [];

    unit:Unit = new Unit();

    unitId:number = 0 ;
}