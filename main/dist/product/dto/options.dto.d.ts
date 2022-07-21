declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
declare enum By {
    PRICE = "price",
    ID = "id"
}
export declare class Options {
    order: Order;
    page: number;
    take: number;
    by: By;
    get skip(): number;
}
export {};
