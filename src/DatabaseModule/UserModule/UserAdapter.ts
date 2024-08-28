import { RequestError } from "src/types/RequestError";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./User";

export interface UserAdapterInterface {
    findAll: () => Promise<User[] | RequestError>
    findById: (id: string) => Promise<User | RequestError>
    findUsername: (username: string) => Promise<User | RequestError>
    findByEmail: (email: string) => Promise<User | RequestError>
    save: (input: Omit<User, "_id">) => Promise<User | RequestError>
    update: (id: string, input: Partial<User>) => Promise<User | RequestError>
    remove: (id: string) => Promise<User | RequestError>
}

@Injectable()
export class UserAdapter implements UserAdapterInterface {
    public constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {  }

    public async findAll(): Promise<User[] | RequestError> {
        try {
            return await this.userModel.find();
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findById(id: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findById(id);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findUsername(username: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findOne({ username });
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findByEmail(email: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findOne({ email });
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<User, "_id">): Promise<User | RequestError> {
        try {
            return await this.userModel.create(input);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async update(id: string, input: Partial<User>): Promise<User | RequestError> {
        try {
            return await this.userModel.findByIdAndUpdate(id, input);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(id: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

}