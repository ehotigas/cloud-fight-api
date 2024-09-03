import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../UserModule/dto/CreateUserDto";
import { ILoggerFactory } from "src/LoggerModule/LoggerFactory";
import { SignInResponseDto } from "./dto/SignInResponseDto";
import { IUserService } from "../UserModule/UserService";
import { DatabaseToken } from "../DatabaseToken";
import { SignInDto } from "./dto/SignInDto";
import { User } from "../UserModule/User";
import { JwtService } from "@nestjs/jwt";
import { AppToken } from "src/AppToken";

export interface IAuthService {
    signIn: (input: SignInDto) => Promise<SignInResponseDto>
    signUp: (input: CreateUserDto) => Promise<User>
}

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger: Logger;
    private readonly key: string;

    public constructor(
        @Inject(DatabaseToken.USER_SERVICE)
        private readonly userService: IUserService,
        @Inject(AppToken.JWT_SERVICE)
        private readonly jwtService: JwtService,
        @Inject(AppToken.LOGGER_FACTORY)
        loggerFactory: ILoggerFactory
    ) {
        this.key = "_$cloud*fight&api";
        this.logger = loggerFactory.getLogger("AuthService");
    }

    public async _signIn(input: SignInDto, user: User) {
        if (user.password !== input.password) {
            throw new UnauthorizedException();
        }
        const token = await this.jwtService.signAsync(
            { id: user._id, date: new Date() },
            { secret: this.key }
        );
        return {
            token: token
        };
    }

    public async signIn(input: SignInDto): Promise<SignInResponseDto> {
        this.logger.log(`Sign in for user: ${input.username}`);
        try {
            const username = await this.userService.findUsername(input.username);
            return await this._signIn(input, username);
        } catch(error) {
            if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {  }
            else throw error;
        }

        const email = await this.userService.findByEmail(input.username);
        return await this._signIn(input, email);
    }

    public async signUp(input: CreateUserDto): Promise<User> {
        try {
            await this.userService.findUsername(input.username);
            throw new HttpException("Username already exists", HttpStatus.BAD_REQUEST);
        } catch (error) {
            if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {  }
            else throw error;
        }
        try {
            await this.userService.findByEmail(input.email);
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
        } catch (error) {
            if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {  }
            else throw error;
        }

        const user = await this.userService.save(input);
        delete user.password;
        return user;
    }
}