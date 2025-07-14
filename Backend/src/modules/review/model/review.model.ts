import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  courseId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema: Schema = new Schema<IReview>(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
export default ReviewModel;
