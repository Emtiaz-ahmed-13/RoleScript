import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    userStatus: "active" | "inactive";
}

export type TUserRole = keyof typeof USER_ROLE;
