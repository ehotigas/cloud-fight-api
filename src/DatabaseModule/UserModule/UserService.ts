import { RequestError } from "src/types/RequestError";
import { UserAdapterInterface } from "./UserAdapter";
import { CreateUserDto } from "./dto/CreateUserDto";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseToken } from "../DatabaseToken";
import { GetUserDto } from "./dto/GetUserDto";
import { User } from "./User";
import { UpdateUserDto } from "./dto/UpdateUserDto";

export interface UserServiceInterface {
    findAll: () => Promise<GetUserDto | RequestError>
    findById: (id: string) => Promise<User | RequestError>
    findUsername: (username: string) => Promise<User | RequestError>
    findByEmail: (email: string) => Promise<User | RequestError>
    save: (input: CreateUserDto) => Promise<User | RequestError>
    update: (id: string, input: UpdateUserDto) => Promise<User | RequestError>
    remove: (id: string) => Promise<User | RequestError>
}

@Injectable()
export class UserService implements UserServiceInterface {
    public constructor(
        @Inject(DatabaseToken.USER_ADAPTER)
        private readonly adapter: UserAdapterInterface
    ) {  }

    public async findAll(): Promise<GetUserDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            users: data
        };
    }

    public async findById(id: string): Promise<User | RequestError> {
        return await this.adapter.findById(id);
    }

    public async findUsername(username: string): Promise<User | RequestError> {
        return await this.adapter.findUsername(username);
    }

    public async findByEmail(email: string): Promise<User | RequestError> {
        return await this.adapter.findByEmail(email);
    }

    public async save(input: CreateUserDto): Promise<User | RequestError> {
        const now = new Date();
        return await this.adapter.save({
            ...input,
            admin: false,
            deleted: false,
            deletedAt: null,
            createdAt: now,
            updatedAt: now,
        });
    }

    public async update(id: string, input: UpdateUserDto): Promise<User | RequestError> {
        return await this.adapter.update(id, { ...input, updatedAt: new Date() });
    }

    public async remove(id: string): Promise<User | RequestError> {
        return await this.adapter.update(id, {
            deleted: true,
            deletedAt: new Date()
        });
    }

}