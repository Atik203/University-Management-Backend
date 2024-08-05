"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // searching
    search(searchAbleFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const searchRegex = new RegExp(searchTerm, 'i');
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((key) => ({
                    [key]: searchRegex,
                })),
            });
        }
        return this;
    }
    // filtering
    filter() {
        const queryObject = Object.assign({}, this.query);
        const excludedFields = ['searchTerm', 'page', 'limit', 'sort', 'fields'];
        excludedFields.forEach((field) => {
            if (queryObject[field]) {
                delete queryObject[field];
            }
        });
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
    // sorting
    sort() {
        var _a;
        const sort = ((_a = this.query.sort) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // pagination
    paginate() {
        var _a, _b;
        const page = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) ? parseInt(this.query.page) : 1;
        const limit = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) ? parseInt(this.query.limit) : 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    // fields limiting
    fields() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) ? parseInt(this.query.page) : 1;
            const limit = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) ? parseInt(this.query.limit) : 10;
            const totalPage = Math.ceil(total / limit);
            return {
                total,
                page,
                limit,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
