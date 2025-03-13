import {ObjectId} from "mongodb";


export type UserDBType = {
    _id?: ObjectId;
    id: string;
    login: string;
    password: string;
    email: string;
    createdAt: Date;
};

export type UserViewModel =Omit<UserDBType, '_id' | 'password'>;
export type CreateUserDto = Pick<UserDBType, 'login' | 'password' | 'email'>;