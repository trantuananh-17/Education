import mongoose, { Document, Schema } from "mongoose";

enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface INotification extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  message: string;
  type: NotificationType;
  seen: boolean;
  createdAt: Date;
}

const notificationSchema: Schema = new Schema<INotification>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(NotificationType),
    },
    seen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
export default NotificationModel;
