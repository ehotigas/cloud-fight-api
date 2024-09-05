import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { CreateLobbyDto } from "./dto/CreateLobbyDto";
import { UpdateLobbyDto } from "./dto/UpdateLobbyDto";
import { DatabaseToken } from "../DatabaseToken";
import { GetLobbyDto } from "./dto/GetLobbyDto";
import { ILobbyAdapter } from "./LobbyAdapter";
import { AppToken } from "src/AppToken";
import { Lobby } from "./Lobby";

export interface ILobbyService {
    /**
     * @async
     * @returns {Promise<GetLobbyDto>}
     * @throws {InternalServerErrorException}
     */
    findAll: () => Promise<GetLobbyDto>

    /**
     * @async
     * @param {string} id 
     * @returns {Promise<Lobby>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    findById: (id: string) => Promise<Lobby>

    /**
     * @async
     * @param {CreateLobbyDto} input 
     * @returns {Promise<Lobby>}
     * @throws {InternalServerErrorException}
     */
    save: (input: CreateLobbyDto) => Promise<Lobby>

    /**
     * @async
     * @param {string} id 
     * @param {UpdateLobbyDto} input 
     * @returns {Promise<Lobby>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    update: (id: string, input: UpdateLobbyDto) => Promise<Lobby>

    /**
     * @async
     * @param {string} id 
     * @returns {Promise<Lobby>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    remove: (id: string) => Promise<Lobby>
}

@Injectable()
export class LobbyService implements ILobbyService {
    private readonly logger: Logger;
    public constructor(
        @Inject(DatabaseToken.LOBBY_ADAPTER)
        private readonly adapter: ILobbyAdapter,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("LobbyService");
    }

    public async findAll(): Promise<GetLobbyDto> {
        this.logger.log(`Feching all lobbys`);
        return {
            lobby: await this.adapter.findAll()
        };
    }

    public async findById(id: string): Promise<Lobby> {
        this.logger.log(`Feching lobby with id: ${id}`);
        const lobby = await this.adapter.findById(id);
        if (!lobby) {
            this.logger.warn(`Lobby with id: ${id} not found`);
            throw new NotFoundException(`Lobby (id: ${id}) not found`);
        }
        return lobby;
    }

    public async save(input: CreateLobbyDto): Promise<Lobby> {
        this.logger.log(`Creating new lobby`);
        return await this.adapter.save({
            ...input,
            createdAt: new Date()
        });
    }

    public async update(id: string, input: UpdateLobbyDto): Promise<Lobby> {
        this.logger.log(`Updating lobby with id: ${id}`);
        const lobby = await this.adapter.update(id, input);
        if (!lobby) {
            this.logger.warn(`Lobby with id: ${id} not found`);
            throw new NotFoundException(`Lobby (id: ${id}) not found`);
        }
        return lobby;
    }

    public async remove(id: string): Promise<Lobby> {
        this.logger.log(`Removing lobby with id: ${id}`);
        const lobby = await this.adapter.remove(id);
        if (!lobby) {
            this.logger.warn(`Lobby with id: ${id} not found`);
            throw new NotFoundException(`Lobby (id: ${id}) not found`);
        }
        return lobby;
    }
}