import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
}

const categorySchema: Schema = new Schema<ICategory>({
  title: { type: String, required: true },
  description: { type: String },
});

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);
export default CategoryModel;
