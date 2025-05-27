import { FilterQuery, Model, UpdateQuery, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async createOne(doc: Partial<T>): Promise<T> {
    return new this.model(doc).save();
  }

  async update(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async delete(filter: FilterQuery<T>): Promise<void> {
    await this.model.deleteOne(filter).exec();
  }
}
