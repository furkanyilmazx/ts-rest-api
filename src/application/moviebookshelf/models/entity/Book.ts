import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  isbn: string;
  name: string;
  author: string;
  totalPages?: number;
  imageUrl?: string;
  avarageRating: number;
}

const BookSchema: Schema = new Schema<IBook>({
  isbn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number },
  imageUrl: { type: String },
  avarageRating: { type: Number },
});

export default mongoose.model<IBook>('Book', BookSchema);
