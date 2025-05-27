import { Document, Types } from 'mongoose';

export type TimestampedDocument<T> = T &
  Document & {
    createdAt: Date;
    updatedAt: Date;
    _id: Types.ObjectId;
  };
