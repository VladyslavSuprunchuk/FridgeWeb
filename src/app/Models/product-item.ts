import { ProductType } from "./product-type"

export class ProductItem{

    id:number = 0;

    notes:string = '';

    amount:number;

    isOpened:boolean;

    purchaseDate:string;

    manufactureDate:string;

    productType = new ProductType();

    productTypeId:number;

    newStorehouseId:number;
}