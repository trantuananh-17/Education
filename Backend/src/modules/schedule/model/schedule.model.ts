import mongoose, { Document, Schema } from "mongoose";

enum ScheduleType {
  REMINDER = "reminder",
  DISCUSSION = "discussion",
}

enum UserJoinStatus {
  PENDING = "pending", //Đang chờ
  ACCEPT = "accept", //Chấp nhận
  REJECT = "reject", // Từ chối
}

export interface ISchedule extends Document {
  userCreated: mongoose.Schema.Types.ObjectId;
  usersJoin: {
    userId: mongoose.Schema.Types.ObjectId;
    status: UserJoinStatus;
  };
  type: ScheduleType;
  link?: string;
  timeStart: Date;
  timeEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

const scheduleSchema: Schema = new Schema<ISchedule>(
  {
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usersJoin: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          required: true,
          enum: Object.values(UserJoinStatus),
        },
      },
    ],
    type: {
      type: String,
      required: true,
      enum: Object.values(ScheduleType),
    },
    link: { type: String, default: null },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
  },
  { timestamps: true }
);

const ScheduleModel = mongoose.model<ISchedule>("Schedule", scheduleSchema);
export default ScheduleModel;
