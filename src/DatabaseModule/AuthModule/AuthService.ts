import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../UserModule/dto/CreateUserDto";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { SignInResponseDto } from "./dto/SignInResponseDto";
import { IUserService } from "../UserModule/UserService";
import { DatabaseToken } from "../DatabaseToken";
import { SignInDto } from "./dto/SignInDto";
import { User } from "../UserModule/User";
import { IJwt } from "src/JwtModule/Jwt";
import { AppToken } from "src/AppToken";

export interface IAuthService {
    /**
     * @async
     * @param {SignInDto} input 
     * @returns {SignInResponseDto}
     * @throws {InternalServerErrorException}
     * @throws {NotFoundException}
     * @throws {UnauthorizedException}
     */
    signIn: (input: SignInDto) => Promise<SignInResponseDto>

    /**
     * @async
     * @param {CreateUserDto} input 
     * @returns {User}
     * @throws {InternalServerErrorException}
     * @throws {BadRequestException}
     */
    signUp: (input: CreateUserDto) => Promise<User>
}

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger: Logger;

    public constructor(
        @Inject(DatabaseToken.USER_SERVICE)
        private readonly userService: IUserService,
        @Inject(AppToken.JWT)
        private readonly jwtService: IJwt,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.logger = loggerFactory.getLogger("AuthService");
    }

    private async generateTokenForUser (user: User) {
        const token = await this.jwtService.signAsync({
            id: user._id,
            date: new Date()
        });
        return { token: token };
    }

    public async signIn(input: SignInDto): Promise<SignInResponseDto> {
        this.logger.log(`Sign in for user: ${input.username}`);
        let user: User;

        try {
            user = await this.userService.findUsername(input.username);
        } catch(error) {
            if (error instanceof NotFoundException) {
                user = await this.userService.findByEmail(input.username);
            }
            else throw error;
        }

        if (user.password !== input.password) {
            throw new UnauthorizedException();
        }

        const token = await this.generateTokenForUser(user);
        return token;
    }

    public async signUp(input: CreateUserDto): Promise<User> {
        try {
            await this.userService.findUsername(input.username);
            throw new BadRequestException("Username already exists");
        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error
            }
        }
        try {
            await this.userService.findByEmail(input.email);
            throw new BadRequestException("Email already exists");
        } catch (error) {
            if (!(error instanceof NotFoundException)) {
                throw error
            }
        }

        const user = await this.userService.save(input);
        delete user.password;
        return user;
    }
}