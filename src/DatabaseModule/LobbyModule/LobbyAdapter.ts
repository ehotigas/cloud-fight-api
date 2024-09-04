import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { InjectModel } from "@nestjs/mongoose";
import { AppToken } from "src/AppToken";
import { Model } from "mongoose";
import { Lobby } from "./Lobby";

export interface ILobbyAdapter {
    findAll: () => Promise<Lobby[]>
    findById: (id: string) => Promise<Lobby>
    save: (input: Omit<Lobby, "_id">) => Promise<Lobby>
    update: (id: string, input: Partial<Lobby>) => Promise<Lobby>
    remove: (id: string) => Promise<Lobby>
}

@Injectable()
export class LobbyAdapter implements ILobbyAdapter {
    private readonly logger: Logger;
    public constructor(
        @InjectModel(Lobby.name)
        private readonly lobbyModel: Model<Lobby>,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("LobbyAdapter");
    }

    public async findAll(): Promise<Lobby[]> {
        try {
            return await this.lobbyModel.find().populate("lobbyUsers").exec();
        }
        catch (error) {
            this.logger.error(`Fail to find all lobby`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async findById(id: string): Promise<Lobby> {
        try {
            return await this.lobbyModel.findById(id);
        }
        catch (error) {
            this.logger.error(`Fail to find lobby with id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async save(input: Omit<Lobby, "_id">): Promise<Lobby> {
        try {
            return await this.lobbyModel.create(input);
        }
        catch (error) {
            this.logger.error(`Fail to save lobby`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async update(id: string, input: Partial<Lobby>): Promise<Lobby> {
        try {
            return await this.lobbyModel.findByIdAndUpdate(id, input);
        }
        catch (error) {
            this.logger.error(`Fail to update lobby with id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }

    public async remove(id: string): Promise<Lobby> {
        try {
            return await this.lobbyModel.findByIdAndDelete(id);
        }
        catch (error) {
            this.logger.error(`Fail to remove lobby with id: ${id}`, error);
            throw new InternalServerErrorException(error.message);
        }
    }
}