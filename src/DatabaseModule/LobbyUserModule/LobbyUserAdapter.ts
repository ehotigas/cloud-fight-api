import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { InjectModel } from "@nestjs/mongoose";
import { AppToken } from "src/AppToken";
import { LobbyUser } from "./LobbyUser";
import { Model } from "mongoose";

export interface ILobbyUserAdapter {
    findAll: () => Promise<LobbyUser[]>
    findById: (id: string) => Promise<LobbyUser>
    save: (input: Omit<LobbyUser, "_id">) => Promise<LobbyUser>
    update: (id: string, input: Partial<LobbyUser>) => Promise<LobbyUser>
    remove: (id: string) => Promise<LobbyUser>
}

@Injectable()
export class LobbyUserAdapter implements ILobbyUserAdapter {
    private readonly logger: Logger;
    public constructor(
        @InjectModel(LobbyUser.name)
        private readonly model: Model<LobbyUser>,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("LobbyUserAdapter");
    }

    public async findAll(): Promise<LobbyUser[]> {
        try {
            return await this.model.find();
        }
        catch (error) {
            this.logger.error("Fail to find all lobby users", error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async findById(id: string): Promise<LobbyUser> {
        try {
            return await this.model.findById(id);
        }
        catch (error) {
            this.logger.error(`Fail to find lobby user id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async save(input: Omit<LobbyUser, "_id">): Promise<LobbyUser> {
        try {
            return await this.model.create(input);
        }
        catch (error) {
            this.logger.error(`Fail to save lobby user`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async update(id: string, input: Partial<LobbyUser>): Promise<LobbyUser> {
        try {
            return await this.model.findByIdAndUpdate(id, input, { new: true });
        }
        catch (error) {
            this.logger.error(`Fail to update lobby user id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async remove(id: string): Promise<LobbyUser> {
        try {
            return await this.model.findByIdAndDelete(id);
        }
        catch (error) {
            this.logger.error(`Fail to remove lobby user id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }
}