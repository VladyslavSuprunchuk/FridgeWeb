import {UnitClient} from './UnitClient'
import { from } from "rxjs";

export class ProductTypeClient{

    id:number;

    name:string;

    imageUrl:string;

    expirationTerm:number;

    openedExpirationTerm:number;

    isFavorite:boolean;

    description:string;

    tags:[string];

    unitClient:UnitClient;

    unitClietId:number;
}