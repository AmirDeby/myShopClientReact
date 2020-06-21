import { IProduct } from "./Product";

export interface ICartItem extends IProduct {
    quantity:number
}