export declare class Result {
    data: any[];
    meta: Meta;
    constructor(entities: any, meta: any);
}
export declare class Meta {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor(page: number, take: number, itemCount: number);
}
