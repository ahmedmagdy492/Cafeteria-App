export interface Product {
    Id : number;
    Name: string;
    Price : number;
    ImgUrl: string;
    CategoryId: number;
    IsAvailable? : boolean;
}
