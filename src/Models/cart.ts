export interface ICart {
    id:number,
    inventory:number,
    name:string,
    description:string,
    image:string,
    originalPrice: string,
    salePrice:string,
    categoryId:number,
    productId:number,
    userId: number,
    quantity:number
}