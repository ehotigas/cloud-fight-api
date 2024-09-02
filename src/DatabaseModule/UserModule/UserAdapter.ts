import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { InjectModel } from "@nestjs/mongoose";
import { AppToken } from "src/AppToken";
import { Model } from "mongoose";
import { User } from "./User";

export interface IUserAdapter {
    findAll: () => Promise<User[]>
    findById: (id: string) => Promise<User>
    findUsername: (username: string) => Promise<User>
    findByEmail: (email: string) => Promise<User>
    save: (input: Omit<User, "_id">) => Promise<User>
    update: (id: string, input: Partial<User>) => Promise<User>
    remove: (id: string) => Promise<User>
}

@Injectable()
export class UserAdapter implements IUserAdapter {
    private readonly logger: Logger;

    public constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("UserAdapter");
    }

    public async findAll(): Promise<User[]> {
        try {
            return await this.userModel.find();
        }
        catch(error) {
            this.logger.error("Fail to find all users", error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async findById(id: string): Promise<User> {
        try {
            return await this.userModel.findById(id);
        }
        catch(error) {
            this.logger.error(`Fail to find user id: ${id}`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async findUsername(username: string): Promise<User> {
        try {
            return await this.userModel.findOne({ username });
        }
        catch(error) {
            this.logger.error(`Fail to find username: ${username}`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async findByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne({ email });
        }
        catch(error) {
            this.logger.error(`Fail to find user email: ${email}`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async save(input: Omit<User, "_id">): Promise<User> {
        try {
            return await this.userModel.create(input);
        }
        catch(error) {
            this.logger.error(`Fail to save user`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async update(id: string, input: Partial<User>): Promise<User> {
        try {
            return await this.userModel.findByIdAndUpdate(id, input);
        }
        catch(error) {
            this.logger.error(`Fail to update user id: ${id}`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async remove(id: string): Promise<User> {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch(error) {
            this.logger.error(`Fail to remove user id: ${id}`, error.stack);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}