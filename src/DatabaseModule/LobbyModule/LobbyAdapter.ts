import { RequestError } from "src/types/RequestError";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Lobby } from "./Lobby";

export interface ILobbyAdapter {
    findAll: () => Promise<Lobby[] | RequestError>
    findById: (id: string) => Promise<Lobby | RequestError>
    save: (input: Omit<Lobby, "_id">) => Promise<Lobby | RequestError>
    update: (id: string, input: Partial<Lobby>) => Promise<Lobby | RequestError>
    remove: (id: string) => Promise<Lobby | RequestError>
}

@Injectable()
export class LobbyAdapter implements ILobbyAdapter {
    public constructor(
        @InjectModel(Lobby.name)
        private readonly lobbyModel: Model<Lobby>
    ) {  }

    public async findAll(): Promise<Lobby[] | RequestError> {
        try {
            return await this.lobbyModel.find();
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findById(id: string): Promise<Lobby | RequestError> {
        try {
            return await this.lobbyModel.findById(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<Lobby, "_id">): Promise<Lobby | RequestError> {
        try {
            return await this.lobbyModel.create(input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async update(id: string, input: Partial<Lobby>): Promise<Lobby | RequestError> {
        try {
            return await this.lobbyModel.findByIdAndUpdate(id, input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(id: string): Promise<Lobby | RequestError> {
        try {
            return await this.lobbyModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }
}