import mongoose from "mongoose";

export interface IRegisterUserDTO {
  email: string;
  fullname: string;
  password: string;
}

export interface IChangePasswordUserDTO {
  oldPassword: string;
  newPassword: string;
}

export interface ILoginUserDTO {
  email: string;
  password: string;
}

export interface ILoginUserResponseDTO {
  access_token: string;
  refresh_token: string;
}

export interface IUserPayload {
  _id: mongoose.Schema.Types.ObjectId;
  role: string;
  fullname: string;
  email: string;
}
