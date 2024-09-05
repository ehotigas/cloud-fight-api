import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { CreateLobbyuserDto } from "./dto/CreateLobbyuserDto";
import { UpdateLobbyUserDto } from "./dto/UpdateLobbyUserDto";
import { GetLobbyUserDto } from "./dto/GetLobbyUserDto";
import { ILobbyUserAdapter } from "./LobbyUserAdapter";
import { DatabaseToken } from "../DatabaseToken";
import { AppToken } from "src/AppToken";
import { LobbyUser } from "./LobbyUser";

export interface ILobbyUserService {
    /**
     * @async
     * @returns {Promise<GetLobbyUserDto>}
     * @throws {InternalServerErrorException}
     */
    findAll: () => Promise<GetLobbyUserDto>

    /**
     * @async
     * @param {string} id 
     * @returns {Promise<LobbyUser>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    findById: (id: string) => Promise<LobbyUser>

    /**
     * @async
     * @param {CreateLobbyuserDto} input 
     * @returns {Promise<LobbyUser>}
     * @throws {InternalServerErrorException}
     */
    save: (input: CreateLobbyuserDto) => Promise<LobbyUser>

    /**
     * @async
     * @param {string} id 
     * @param {UpdateLobbyUserDto} input 
     * @returns {Promise<LobbyUser>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    update: (id: string, input: UpdateLobbyUserDto) => Promise<LobbyUser>

    /**
     * @async
     * @param {string} id 
     * @returns {Promise<LobbyUser>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    remove: (id: string) => Promise<LobbyUser>
}

@Injectable()
export class LobbyUserService implements ILobbyUserService {
    private readonly logger: Logger;

    public constructor(
        @Inject(DatabaseToken.LOBBY_USER_ADAPTER)
        private readonly adapter: ILobbyUserAdapter,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("LobbyUserService");
    }

    public async findAll(): Promise<GetLobbyUserDto> {
        this.logger.log("Fetching all lobby users");
        return {
            lobbyUser: await this.adapter.findAll()
        };
    }

    public async findById(id: string): Promise<LobbyUser> {
        this.logger.log(`Fetching lobby user with id: ${id}`);
        const lobbyUser = await this.adapter.findById(id);
        if (!lobbyUser) {
            this.logger.warn(`Lobby user with id: ${id} not found`);
            throw new NotFoundException("LobbyUser id not found");
        }
        return lobbyUser;
    }

    public async save(input: CreateLobbyuserDto): Promise<LobbyUser> {
        this.logger.log("Creating new lobby user");
        return await this.adapter.save({
            ...input,
            createdAt: new Date(),
            ready: false
        });
    }

    public async update(id: string, input: UpdateLobbyUserDto): Promise<LobbyUser> {
        this.logger.log(`Updating lobby user with id: ${id}`);
        const lobbyUser = await this.adapter.update(id, input);
        if (!lobbyUser) {
            this.logger.warn(`Lobby user with id: ${id} not found`);
            throw new NotFoundException("LobbyUser id not found");
        }
        return lobbyUser;
    }

    public async remove(id: string): Promise<LobbyUser> {
        this.logger.log(`Removing lobby user with id: ${id}`);
        const lobbyUser = await this.adapter.remove(id);
        if (!lobbyUser) {
            this.logger.warn(`Lobby user with id: ${id} not found`);
            throw new NotFoundException("LobbyUser id not found");
        }
        return lobbyUser;
    }

}