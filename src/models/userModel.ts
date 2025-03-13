import {ObjectId} from "mongodb";


export type UserDBType = {
    _id?: ObjectId;
    id: string;
    login: string;
    password: string;
    email: string;
    createdAt: string;
};

export type UserViewModel =Omit<UserDBType, '_id' | 'password'>;
export type CreateUserDto = Pick<UserDBType, 'login' | 'password' | 'email'>;