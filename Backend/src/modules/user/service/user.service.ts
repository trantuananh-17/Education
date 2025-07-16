import {
  IChangePasswordUserDTO,
  IRegisterUserDTO,
} from "./../interface/user.interface";
import {
  apiError,
  apiResponse,
  APIResponse,
} from "../../../utils/apiResponse.utils";
import HttpStatus from "../../../utils/httpstatus.utils";
import { generateToken } from "../helper/token.helper";
import {
  ILoginUserDTO,
  ILoginUserResponseDTO,
} from "../interface/user.interface";
import UserModel from "../model/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginService = async (
  user: ILoginUserDTO
): Promise<APIResponse<ILoginUserResponseDTO>> => {
  try {
    const { email, password } = user;

    const checkUser = await UserModel.findOne({ email });

    if (checkUser === null) {
      return apiError(
        HttpStatus.UNAUTHORIZED,
        "Tài khoản hoặc mật khẩu không chính xác."
      );
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return apiError(
        HttpStatus.UNAUTHORIZED,
        "Tài khoản hoặc mật khẩu không chính xác."
      );
    }

    const tokenPayload = {
      id: checkUser._id.toString(),
      email: checkUser.email,
      role: checkUser.role,
      fullname: checkUser.fullname,
    };

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey || secretKey === "") {
      return apiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau."
      );
    }

    const accessToken = await generateToken(tokenPayload, secretKey, "15m");

    const refreshToken = await generateToken(tokenPayload, secretKey, "7d");

    const userLogin: ILoginUserResponseDTO = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    return apiResponse(HttpStatus.OK, "Đăng nhập thành công.", userLogin);
  } catch (error) {
    console.log("Error in loginService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const registerService = async (user: IRegisterUserDTO) => {
  try {
    const { email, fullname, password } = user;

    const existedUser = await UserModel.findOne({
      email: email,
    });

    if (existedUser !== null) {
      return apiError(HttpStatus.CONFLICT, "Tài khoản đã được đăng ký.");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, fullname, password: hash });
    const createdUser = await newUser.save();

    return apiResponse(HttpStatus.CREATED, "Đăng ký thành công", createdUser);
  } catch (error) {
    console.log("Error in registerService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};

export const changePasswordService = async (
  id: string,
  user: IChangePasswordUserDTO
) => {
  try {
    const checkUser = await UserModel.findOne({ _id: id });

    console.log(checkUser);

    if (checkUser === null) {
      return apiError(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại.");
    }

    const { newPassword, oldPassword } = user;

    const comparePassword = await bcrypt.compare(
      newPassword,
      checkUser?.password
    );
    const compareCurrentPassword = await bcrypt.compare(
      oldPassword,
      checkUser.password
    );

    if (!compareCurrentPassword) {
      return apiError(HttpStatus.CONFLICT, "Mật khẩu không chính xác.");
    }

    if (comparePassword) {
      return apiError(
        HttpStatus.CONFLICT,
        "Vui lòng nhập mật khẩu khác với mật khẩu hiện tại."
      );
    }

    const hash = await bcrypt.hash(newPassword, 10);

    checkUser.password = hash;
    await checkUser.save();

    return apiResponse(HttpStatus.OK, "Thay đổi mật khẩu thành công");
  } catch (error) {
    console.log("Error in changePasswordService: ", error);
    return apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.",
      error
    );
  }
};
