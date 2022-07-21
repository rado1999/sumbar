"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meta = exports.Result = void 0;
class Result {
    constructor(entities, meta) {
        this.data = entities;
        this.meta = meta;
    }
}
exports.Result = Result;
class Meta {
    constructor(page, take, itemCount) {
        this.page = page;
        this.take = take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
exports.Meta = Meta;
//# sourceMappingURL=result.dto.js.map