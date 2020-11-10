import { ProductType } from "./product-type"

export class ProductItem{

    id:number = 0;

    notes:string = '';

    amount:number;

    isOpened:boolean;

    purchaseDate:any;

    manufactureDate:any

    productType:ProductType;

    productTypeId:number;

    newStorehouseId:number;
}