import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // searching
  search(searchAbleFields: string[]) {
    const searchTerm = this.query.searchTerm ? this.query.searchTerm : '';
    const searchRegex = new RegExp(searchTerm as string, 'i');

    this.modelQuery = this.modelQuery.find({
      $or: searchAbleFields.map(
        (key) =>
          ({
            [key]: searchRegex,
          }) as FilterQuery<T>,
      ),
    });

    return this;
  }

  // filtering

  filter() {
    const queryObject = { ...this.query };
    const excludedFields = ['searchTerm', 'page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((field) => {
      if (queryObject[field]) {
        delete queryObject[field];
      }
    });

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
