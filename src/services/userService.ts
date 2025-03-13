
import { userRepository } from '../repositories/userRepository';
import { userQueryRepository } from '../repositories/userQueryRepository';
import { CreateUserDto, UserViewModel, UserDBType } from '../models/userModel';
import bcrypt from 'bcryptjs';


const SALT_ROUNDS = 10;


export const userService = {

    async getUsers(query: any) {
        return await userQueryRepository.getUsers(query);
    },

    async createUser(input: CreateUserDto): Promise<UserViewModel | { errorsMessages: { field: string; message: string }[] }> {
        const existingByLogin = await userRepository.getByLogin(input.login);
        if (existingByLogin) {
            return { errorsMessages: [{ field: 'login', message: 'login should be unique' }] };
        }
        const existingByEmail = await userRepository.getByEmail(input.email);
        if (existingByEmail) {
            return { errorsMessages: [{ field: 'email', message: 'email should be unique' }] };
        }
        const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
        const newUser: UserViewModel = await userRepository.create(input, hashedPassword);
        return {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            createdAt: new Date(),
        };
    },

    async deleteUser(id: string): Promise<boolean> {
        return await userRepository.delete(id);
    },

    async loginUser(loginOrEmail: string, password: string): Promise<boolean> {
        let user = await userRepository.getByLogin(loginOrEmail);
        if (!user) {
            user = await userRepository.getByEmail(loginOrEmail);
        }
        if (!user) return false;
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
    },
};
