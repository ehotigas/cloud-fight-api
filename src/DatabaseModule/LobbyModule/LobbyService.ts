import { LobbyAdapterInterface } from "./LobbyAdapter";
import { CreateLobbyDto } from "./dto/CreateLobbyDto";
import { RequestError } from "src/types/RequestError";
import { UpdateLobbyDto } from "./dto/UpdateLobbyDto";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseToken } from "../DatabaseToken";
import { GetLobbyDto } from "./dto/GetLobbyDto";
import { Lobby } from "./Lobby";

export interface LobbyServiceInterface {
    findAll: () => Promise<GetLobbyDto | RequestError>
    findById: (id: string) => Promise<Lobby | RequestError>
    save: (input: CreateLobbyDto) => Promise<Lobby | RequestError>
    update: (id: string, input: UpdateLobbyDto) => Promise<Lobby | RequestError>
    remove: (id: string) => Promise<Lobby | RequestError>
}

@Injectable()
export class LobbyService implements LobbyServiceInterface {
    public constructor(
        @Inject(DatabaseToken.LOBBY_ADAPTER)
        private readonly adapter: LobbyAdapterInterface
    ) {  }

    public async findAll(): Promise<GetLobbyDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            lobby: data
        };
    }

    public async findById(id: string): Promise<Lobby | RequestError> {
        return await this.adapter.findById(id);
    }

    public async save(input: CreateLobbyDto): Promise<Lobby | RequestError> {
        return await this.adapter.save({
            ...input,
            createdAt: new Date()
        });
    }

    public async update(id: string, input: UpdateLobbyDto): Promise<Lobby | RequestError> {
        return await this.adapter.update(id, input);
    }

    public async remove(id: string): Promise<Lobby | RequestError> {
        return await this.adapter.remove(id);
    }
}