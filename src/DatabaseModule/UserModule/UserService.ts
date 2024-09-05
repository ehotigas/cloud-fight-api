import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DatabaseToken } from "../DatabaseToken";
import { GetUserDto } from "./dto/GetUserDto";
import { IUserAdapter } from "./UserAdapter";
import { AppToken } from "src/AppToken";
import { User } from "./User";

export interface IUserService {
    /**
     * @returns {Promise<GetUserDto>}
     * @throws {InternalServerErrorException}
     */
    findAll: () => Promise<GetUserDto>

    /**
     * @param {string} id 
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    findById: (id: string) => Promise<User>

    /**
     * @param {string} username 
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    findUsername: (username: string) => Promise<User>

    /**
     * @param {string} email
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    findByEmail: (email: string) => Promise<User>

    /**
     * @param {CreateUserDto} input 
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     */
    save: (input: CreateUserDto) => Promise<User>

    /**
     * @param {string} id 
     * @param {UpdateUserDto} input 
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    update: (id: string, input: UpdateUserDto) => Promise<User>

    /**
     * @param {string} id 
     * @returns {Promise<User>}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     */
    remove: (id: string) => Promise<User>
}

@Injectable()
export class UserService implements IUserService {
    private readonly logger: Logger;
    public constructor(
        @Inject(DatabaseToken.USER_ADAPTER)
        private readonly adapter: IUserAdapter,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("UserService");
    }

    public async findAll(): Promise<GetUserDto> {
        this.logger.log(`Feching all users`);
        return {
            users: await this.adapter.findAll()
        };
    }

    public async findById(id: string): Promise<User> {
        this.logger.log(`Feching user with id: ${id}`);
        const user = await this.adapter.findById(id);
        if (!user) {
            this.logger.warn(`User with id: ${id} not found`);
            throw new NotFoundException(`User (id: ${id}) not found exception`);
        }
        return user;
    }

    public async findUsername(username: string): Promise<User> {
        this.logger.log(`Feching user with username: ${username}`);
        const user = await this.adapter.findUsername(username);
        if (!user) {
            this.logger.warn(`User with username: ${username} not found`);
            throw new NotFoundException(`User (username: ${username}) not found exception`);
        }
        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        this.logger.log(`Feching user with email: ${email}`);
        const user =  await this.adapter.findByEmail(email);
        if (!user) {
            this.logger.warn(`User with email: ${email} not found`);
            throw new NotFoundException(`User (email: ${email}) not found exception`);
        }
        return user;
    }

    public async save(input: CreateUserDto): Promise<User> {
        this.logger.log(`Saving user`);
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

    public async update(id: string, input: UpdateUserDto): Promise<User> {
        this.logger.log(`Updating user with id: ${id}`);
        const user = await this.adapter.update(id, { ...input, updatedAt: new Date() });
        if (!user) {
            this.logger.warn(`User with id: ${id} not found`);
            throw new NotFoundException(`User (id: ${id}) not found exception`);
        }
        return user;
    }

    public async remove(id: string): Promise<User> {
        this.logger.log(`Removing user with id: ${id}`);
        const user = await this.adapter.update(id, {
            deleted: true,
            deletedAt: new Date()
        });
        if (!user) {
            this.logger.warn(`User with id: ${id} not found`);
            throw new NotFoundException(`User (id: ${id}) not found exception`);
        }
        return user;
    }

}