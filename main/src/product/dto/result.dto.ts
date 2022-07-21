export class Result {
    data: any[]
    meta: Meta

    constructor(entities: any, meta: any) {
        this.data = entities
        this.meta = meta
    }
}

export class Meta {
    readonly page: number
    readonly take: number
    readonly itemCount: number
    readonly pageCount: number
    readonly hasPreviousPage: boolean
    readonly hasNextPage: boolean

    constructor(page: number, take: number, itemCount: number) {
        this.page = page
        this.take = take
        this.itemCount = itemCount
        this.pageCount = Math.ceil(this.itemCount / this.take)
        this.hasPreviousPage = this.page > 1
        this.hasNextPage = this.page < this.pageCount
    }
}